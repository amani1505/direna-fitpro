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
  imports: [EquipmentsComponent, AngularSvgIconModule],
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
  categories = computed(
    () => this._equipmentCategoryService.allEquipmentCategories() || [],
  );
  totalItems = computed(
    () => this._equipmentsService.equipments()?.total_items || 0,
  );
  totalPages = computed(
    () => this._equipmentsService.equipments()?.total_pages || 1,
  );
  loading = this._equipmentsService.loading;
  itemsPerPage = 10;

  /** Track selected category as a signal (updates immediately) */
  selectedCategory = signal<string | null>(null);

  /** Compute if any filter is applied */
  isFiltered = computed(() => !!this.selectedCategory());

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const category =
        params['filterBy'] === 'category' ? params['search'] : null;
      this.selectedCategory.set(category);

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
      this._equipmentCategoryService.getAllEquipmentCategory();
    });
  }

  // private updateRouteAndFetch(params: Partial<QueryParams>) {
  //   const queryParams = { ...params };

  //   // Remove empty values
  //   Object.keys(queryParams).forEach((key) => {
  //     const value = queryParams[key as keyof QueryParams];
  //     if (value === '' || value === null || value === undefined) {
  //       delete queryParams[key as keyof QueryParams];
  //     }
  //   });

  //   this._router.navigate([], {
  //     relativeTo: this._route,
  //     queryParams: queryParams,
  //     queryParamsHandling: 'merge',
  //   });
  // }

  private updateRouteAndFetch(params: Partial<QueryParams>) {
    const queryParams = { ...params };

    if (queryParams.page === 1) {
      delete queryParams.page;
    }

    // Navigate with the new query params, allowing Angular to handle null values
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number) {
    this.updateRouteAndFetch({ page });
  }

  onItemCountChange(limit: number) {
    this.updateRouteAndFetch({ limit: limit });
  }

  onSortChange(sort: 'DESC' | 'ASC') {
    this.updateRouteAndFetch({ sortOrder: sort });
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category); // Update signal immediately
    this.updateRouteAndFetch({ filterBy: 'category', search: category });
  }

  /** Clear filters when "All Equipments" is selected */
  clearFilters() {
    this.selectedCategory.set(null); // Immediately update UI
    this.updateRouteAndFetch({
      filterBy: null,
      search: null,
      sortOrder: null,
      limit: null,
      page: 1, // Reset to the first page
    });
  }
}
