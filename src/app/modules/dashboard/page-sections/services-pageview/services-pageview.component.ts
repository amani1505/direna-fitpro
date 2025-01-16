import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';
import { AddServiceModalComponent } from './add-service-modal/add-service-modal.component';
import { PaginationComponent } from '@components/paginations/pagination/pagination.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ServicesService } from '@service/modules/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '@model/QueryParams.interface';
import { updateRouteAndFetch } from '@utils/update-route-fetch';

@Component({
  selector: 'ServicesPageview',
  standalone: true,
  imports: [
    ServiceCardComponent,
    AddServiceModalComponent,
    PaginationComponent,
    AngularSvgIconModule,
  ],
  templateUrl: './services-pageview.component.html',
  styleUrl: './services-pageview.component.scss',
})
export class ServicesPageviewComponent implements OnInit {
  private _serviceService = inject(ServicesService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  isServiceodalOpen = signal<boolean>(false);

  currentPage = signal(1);
  searchTerm = signal('');
  searchBy = signal<string>('name');

  services = computed(() => this._serviceService.services()?.data || []);
  totalItems = computed(
    () => this._serviceService.services()?.total_items || 0,
  );
  totalPages = computed(
    () => this._serviceService.services()?.total_pages || 1,
  );
  loading = this._serviceService.loading;

  itemsPerPage = 12;

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const queryParams: QueryParams = {
        page: +params['page'] || 1,
        limit: +params['limit'] || this.itemsPerPage,
        sortBy: params['sortBy'] || 'created_at',
        sortOrder: params['sortOrder'] || 'DESC',
        search: params['search'] || '',
        filterBy: params['searchBy'] || 'name',
        withPagination: true,
      };

      this.currentPage.set(queryParams.page);
      this.searchTerm.set(queryParams.search || '');

      // Fetch members with query params
      this._serviceService.findAll(queryParams);
    });
  }

  add() {
    this.isServiceodalOpen.set(true);
  }
  closeServiceModal() {
    this.isServiceodalOpen.set(false);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    updateRouteAndFetch(
      {
        search: value,
        page: 1,
      },
      this._route,
      this._router,
    );
  }
  onPageChange(page: number) {
    updateRouteAndFetch({ page }, this._route, this._router);
  }
}
