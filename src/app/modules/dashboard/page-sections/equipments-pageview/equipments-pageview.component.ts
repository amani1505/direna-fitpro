import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { QueryParams } from '@model/QueryParams.interface';
import {
  HeaderColumn,
  RowColumn,
  TableActions,
} from '@model/TableColumn.interface';
import { EquipmentService } from '@service/modules/equipment.service';

@Component({
  selector: 'equipments-pageview',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './equipments-pageview.component.html',
  styleUrl: './equipments-pageview.component.scss',
})
export class EquipmentsPageviewComponent implements OnInit {
  private _equipmentsService = inject(EquipmentService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  isModalOpen = signal<boolean>(false);
  equipmentId: string = '';

  currentPage = signal(1);
  searchTerm = signal('');
  statusFilter = signal<string>('title');

  equipemnts = computed(() => this._equipmentsService.equipments()?.data || []);
  totalItems = computed(
    () => this._equipmentsService.equipments()?.total_items || 0,
  );
  totalPages = computed(
    () => this._equipmentsService.equipments()?.total_pages || 1,
  );
  loading = this._equipmentsService.loading;

  itemsPerPage = 10;

  headerColumns: HeaderColumn[] = [
    { key: 's/n', type: 's/n', label: 'S/N' },
    { key: 'files[0].file_path', type: 'image', label: 'Equipment Image' },
    { key: 'title', type: 'text', label: 'Equipment Name' },
    { key: 'model', type: 'text', label: 'Model Number' },
    { key: 'serial_number', type: 'text', label: 'Serial Number' },
    { key: 'quantity', type: 'text', label: 'Quantity' },
    { key: 'price', type: 'text', label: 'Price' },
    { key: 'purchase_date', type: 'text', label: 'Purchase Date' },
    { key: 'actions', type: 'actions' },
  ];

  rowColumns: RowColumn[] = [
    { key: 's/n', type: 's/n' },
    { key: 'files[0].file_path', type: 'image' },
    { key: 'title', type: 'text' },
    { key: 'model', type: 'text' },
    { key: 'serial_number', type: 'text' },
    { key: 'quantity', type: 'text' },
    { key: 'price', type: 'text' },
    { key: 'purchase_date', type: 'date' },

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
        filterBy: params['filterBy'] || 'title',
        relations: ['files'],
        withPagination: true,
      };

      this.currentPage.set(queryParams.page);
      this.searchTerm.set(queryParams.search || '');
      this.statusFilter.set(queryParams.filterBy || 'title');

      // Fetch members with query params
      this._equipmentsService.findAll(queryParams);

      this.actions[0].value = queryParams.search || '';
    });
  }

  actions: TableActions[] = [
    {
      type: 'search',
      value: this.searchTerm(),
      placeholder: 'Search users',
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
        { label: 'Goal', value: 'goal' },
      ],
      placeholder: 'Select Members Column',
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

  onStatusFilterChange(status: string) {
    this.updateRouteAndFetch({
      filterBy: status,
      page: 1,
    });
  }

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

  addNewEquipment() {
    this._router.navigate(['add'], { relativeTo: this._route });
  }

  deleteModal(id: any) {
    this.equipmentId = id;
    this.isModalOpen.set(true);
  }

  delete() {
    this._equipmentsService.delete(this.equipmentId);
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
