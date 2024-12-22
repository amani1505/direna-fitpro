import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '@components/modal/modal.component';
import { TableComponent } from '@components/table/table.component';
import { QueryParams } from '@model/QueryParams.interface';
import {
  HeaderColumn,
  RowColumn,
  TableActions,
} from '@model/TableColumn.interface';
import { MemberService } from '@service/modules/member.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'members-pageview',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './members-pageview.component.html',
  styleUrl: './members-pageview.component.scss',
})
export class MembersPageviewComponent implements OnInit {
  private _memberService = inject(MemberService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  isModalOpen = signal<boolean>(false);
  memberId: string = '';

  currentPage = signal(1);
  searchTerm = signal('');
  statusFilter = signal<string>('fullname');

  // Computed data from service
  members = computed(() => this._memberService.members()?.data || []);
  totalItems = computed(() => this._memberService.members()?.total_items || 0);
  totalPages = computed(() => this._memberService.members()?.total_pages || 1);
  loading = this._memberService.loading;

  // Component configuration
  itemsPerPage = 10;

  headerColumns: HeaderColumn[] = [
    { key: 's/n', type: 's/n', label: 'S/N' },
    { key: 'fullname', type: 'text', label: 'Member Name' },
    { key: 'email', type: 'text', label: 'Member Email' },
    { key: 'gender', type: 'text', label: 'Gender' },
    { key: 'weight', type: 'text', label: 'Weight' },
    { key: 'height', type: 'text', label: 'Height' },
    { key: 'goal', type: 'text', label: 'Goal' },
    { key: 'isActive', type: 'text', label: 'Status' },
    { key: 'actions', type: 'actions' },
  ];

  rowColumns: Array<RowColumn> = [
    { key: 's/n', type: 's/n' },
    { key: 'fullname', type: 'text' },
    { key: 'email', type: 'text' },
    { key: 'gender', type: 'text' },
    { key: 'weight', type: 'text' },
    { key: 'height', type: 'text' },
    { key: 'goal', type: 'text' },
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

      // Fetch members with query params
      this._memberService.findAll(queryParams);

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

  toggleUsers(checked: any) {
    console.log('Checked', checked);
  }
  toggleUser(selected: any) {
    console.log('Row', selected);
    // const selectedUsers = this.data.filter((user) => user.selected);
  }
  addNewMember() {
    this._router.navigate(['add'], { relativeTo: this._route });
  }

  deleteModal(id: any) {
    this.memberId = id;
    this.isModalOpen.set(true);
  }
  delete() {
    this._memberService.delete(this.memberId);
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
