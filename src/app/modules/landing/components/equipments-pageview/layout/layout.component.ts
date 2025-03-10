import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EquipmentsComponent } from '../components/equipments/equipments.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentService } from '@service/modules/equipment.service';
import { QueryParams } from '@model/QueryParams.interface';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { environment } from 'environments/environment';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'equipment-layout',
  standalone: true,
  imports: [EquipmentsComponent,AngularSvgIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  private _equipmentsService = inject(EquipmentService);
  private _equipmentCategoryService = inject(EquipmemntCategoryService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
    fileUrl = environment.staicUrl;

  currentPage = signal(1);

  equipemnts = computed(() => this._equipmentsService.equipments()?.data || []);
  categories= computed(() => this._equipmentCategoryService.allEquipmentCategories() || []);
  totalItems = computed(
    () => this._equipmentsService.equipments()?.total_items || 0,
  );
  totalPages = computed(
    () => this._equipmentsService.equipments()?.total_pages || 1,
  );
  loading = this._equipmentsService.loading;

  itemsPerPage = 10;

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const queryParams: QueryParams = {
        page: +params['page'] || 1,
        limit: +params['limit'] || this.itemsPerPage,
        sortBy: params['sortBy'] || 'created_at',
        sortOrder: params['sortOrder'] || 'DESC',
        search: params['search'] || '',
        filterBy: params['filterBy'] || 'title',
        relations: ['files'],
        withPagination: true,
      };

      this.currentPage.set(queryParams.page);

      this._equipmentsService.findAll(queryParams);
      this._equipmentCategoryService.getAllEquipmentCategory()
    });
  }

  private updateRouteAndFetch(params: Partial<QueryParams>) {
    const queryParams = { ...params };

    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key as keyof QueryParams];
      if (value === '') {
        (queryParams[key as keyof QueryParams] as any) = null;
      }
    });

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number) {
    this.updateRouteAndFetch({ page });
  }
  onItemPerPageChange(limit: number) {
    this.updateRouteAndFetch({ limit: limit });
  }


}
