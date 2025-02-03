import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { QueryParams } from '@model/QueryParams.interface';
import {
  HeaderColumn,
  RowColumn,
  TableActions,
} from '@model/TableColumn.interface';
import { StaffService } from '@service/modules/staff.service';

@Component({
  selector: 'staffs-pageview',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './staffs-pageview.component.html',
  styleUrl: './staffs-pageview.component.scss',
})
export class StaffsPageviewComponent {
  private _staffService = inject(StaffService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  isModalOpen = signal<boolean>(false);
  staffId: string = '';

  currentPage = signal(1);
  searchTerm = signal('');
  statusFilter = signal<string>('fullname');

  // Computed data from service
  staffs = computed(() => this._staffService.staffs()?.data || []);
  totalItems = computed(() => this._staffService.staffs()?.total_items || 0);
  totalPages = computed(() => this._staffService.staffs()?.total_pages || 1);
  loading = this._staffService.loading;

  // Component configuration
  itemsPerPage = 10;

  headerColumns: HeaderColumn[] = [
    { key: 's/n', type: 's/n', label: 'S/N' },
    { key: 'fullname', type: 'text', label: 'Staff Name' },
    { key: 'email', type: 'text', label: 'Staff Email' },
    { key: 'gender', type: 'text', label: 'Gender' },
    { key: 'isActive', type: 'text', label: 'Status' },
    { key: 'actions', type: 'actions' },
  ];

  rowColumns: Array<RowColumn> = [
    { key: 's/n', type: 's/n' },
    { key: 'fullname', type: 'text' },
    { key: 'email', type: 'text' },
    { key: 'gender', type: 'text' },
    { key: 'isActive', type: 'status' },
    {
      key: 'action',
      type: 'button',
      actionType: ['view', 'update', 'delete'],
    },
  ];

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const queryParams: QueryParams = {
        page: +params['page'] || 1,
        limit: +params['limit'] || this.itemsPerPage,
        sortBy: params['sortBy'] || 'created_at',
        sortOrder: params['sortOrder'] || 'DESC',
        search: params['search'] || '',
        filterBy: params['filterBy'] || 'fullname',
        withPagination: true,
      };

      this.currentPage.set(queryParams.page);
      this.searchTerm.set(queryParams.search || '');
      this.statusFilter.set(queryParams.filterBy || 'fullname');

      this._staffService.findAll(queryParams);

      this.actions[0].value = queryParams.search || '';
    });
  }

  actions: TableActions[] = [
    {
      type: 'search',
      value: this.searchTerm(),
      placeholder: 'Search Staffs',
      action: (event: Event) => {
        const input = event.target as HTMLInputElement;
        this.searchTerm.set(input.value);
        this.onSearch(input.value);
      },
    },
    {
      type: 'select',
      options: [
        { label: 'All', value: '' },
        { label: 'Fullname', value: 'fullname' },
        { label: 'Email', value: 'email' },
      ],
      placeholder: 'Select Staffs Column',
      action: (value: string) => {
        this.onStatusFilterChange(value);
      },
    },
  ];

  onSearch(term: string) {
    this.updateRouteAndFetch({
      search: term,
      page: 1,
    });
  }

  // Status filter functionality
  onStatusFilterChange(status: string) {
    this.updateRouteAndFetch({
      filterBy: status,
      page: 1,
    });
  }

  // Pagination methods
  onPageChange(page: number) {
    this.updateRouteAndFetch({ page });
  }
  onItemPerPageChange(limit: number) {
    this.updateRouteAndFetch({ limit: limit });
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


  addNewStaff() {
    this._router.navigate(['add'], { relativeTo: this._route });
  }

  deleteModal(id: any) {
    this.staffId = id;
    this.isModalOpen.set(true);
  }
  delete() {
    this._staffService.delete(this.staffId);
    this.isModalOpen.set(false);
  }

  update(id: any) {
    this._router.navigate(['edit', id], { relativeTo: this._route });
  }
  view(id: any) {
    this._router.navigate([id], { relativeTo: this._route });
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
