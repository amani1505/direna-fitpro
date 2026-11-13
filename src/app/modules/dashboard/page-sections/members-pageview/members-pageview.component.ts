import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { QueryParams } from '@model/QueryParams.interface';
import {
  HeaderColumn,
  RowColumn,
  TableActions,
  TableRow,
} from '@model/TableColumn.interface';
import { Member } from '@model/member.interface';
import { MemberService } from '@service/modules/member.service';
import { ToastService } from '@service/toast.service';

@Component({
  selector: 'members-pageview',
  imports: [TableComponent],
  templateUrl: './members-pageview.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './members-pageview.component.scss',
})
export class MembersPageviewComponent implements OnInit {
  private _memberService = inject(MemberService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  isModalOpen = signal<boolean>(false);
  memberId = '';

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
    { key: 'weight', type: 'text', label: 'Weight (KG)' },
    { key: 'height', type: 'text', label: 'Height (CM)' },
    { key: 'goal', type: 'text', label: 'Goal' },
    { key: 'isActive', type: 'text', label: 'Status' },
    { key: 'actions', type: 'actions' },
  ];

  rowColumns: RowColumn[] = [
    { key: 's/n', type: 's/n' },
    { key: 'fullname', type: 'text' },
    { key: 'email', type: 'text' },
    { key: 'gender', type: 'text' },
    { key: 'weight', type: 'text' },
    { key: 'height', type: 'text' },
    { key: 'goal', type: 'text' },
    {
      key: 'isActive',
      type: 'status',
      action: (row: TableRow) => {
        const member = row as unknown as Member;
        this._memberService
          .update(member.id, { isActive: !member.isActive })
          .subscribe({
            next: () => {
              this._toast.success('Member Status updated successfully.');
              this._memberService.findAll();
            },
            error: () => {
              this._toast.error('Failed to update the Status');
            },
          });
      },
    },
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
    // Send empty strings as null so they are removed from the URL.
    const queryParams: Record<string, unknown> = { ...params };
    for (const [key, value] of Object.entries(queryParams)) {
      if (value === '') queryParams[key] = null;
    }

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  addNewMember() {
    this._router.navigate(['add'], { relativeTo: this._route });
  }

  deleteModal(id: string) {
    this.memberId = id;
    this.isModalOpen.set(true);
  }
  delete() {
    this._memberService.delete(this.memberId);
    this.isModalOpen.set(false);
  }

  update(id: string) {
    this._router.navigate(['edit', id], { relativeTo: this._route });
  }
  view(id: string) {
    this._router.navigate([id], { relativeTo: this._route });
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
