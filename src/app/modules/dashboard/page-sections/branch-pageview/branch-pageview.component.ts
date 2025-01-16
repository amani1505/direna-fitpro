import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BranchCardComponent } from './branch-card/branch-card.component';
import { AddBranchModalComponent } from './add-branch-modal/add-branch-modal.component';
import { BranchesService } from '@service/modules/branches.service';
import { PaginationComponent } from '@components/paginations/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '@model/QueryParams.interface';
import { updateRouteAndFetch } from '@utils/update-route-fetch';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'BranchPageview',
  standalone: true,
  imports: [
    BranchCardComponent,
    AddBranchModalComponent,
    PaginationComponent,
    AngularSvgIconModule,
  ],
  templateUrl: './branch-pageview.component.html',
  styleUrl: './branch-pageview.component.scss',
})
export class BranchPageviewComponent implements OnInit {
  private _branchService = inject(BranchesService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  isBranchModalOpen = signal<boolean>(false);

  currentPage = signal(1);
  searchTerm = signal('');
  searchBy = signal<string>('road');

  branches = computed(() => this._branchService.branches()?.data || []);
  totalItems = computed(() => this._branchService.branches()?.total_items || 0);
  totalPages = computed(() => this._branchService.branches()?.total_pages || 1);
  loading = this._branchService.loading;

  itemsPerPage = 12;

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const queryParams: QueryParams = {
        page: +params['page'] || 1,
        limit: +params['limit'] || this.itemsPerPage,
        sortBy: params['sortBy'] || 'created_at',
        sortOrder: params['sortOrder'] || 'DESC',
        search: params['search'] || '',
        filterBy: params['searchBy'] || 'road',
        withPagination: true,
      };

      this.currentPage.set(queryParams.page);
      this.searchTerm.set(queryParams.search || '');

      // Fetch members with query params
      this._branchService.findAll(queryParams);
    });
  }

  add() {
    this.isBranchModalOpen.set(true);
  }
  closeBranchModal() {
    this.isBranchModalOpen.set(false);
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
      this._router
    );
  }
  onPageChange(page: number) {
    updateRouteAndFetch({ page }, this._route, this._router);
  }
}
