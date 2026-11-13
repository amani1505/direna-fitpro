import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '@model/QueryParams.interface';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { EquipmentService } from '@service/modules/equipment.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { EquipmentsComponent } from '../components/equipments/equipments.component';

const DEFAULT_LIMIT = 12;

@Component({
  selector: 'equipment-layout',
  imports: [EquipmentsComponent, AngularSvgIconModule],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, AfterViewInit {
  private _equipmentsService = inject(EquipmentService);
  private _equipmentCategoryService = inject(EquipmemntCategoryService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  fileUrl = environment.staicUrl;

  readonly pageSizes = [12, 24, 36];

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

  currentPage = signal(1);
  limit = signal(DEFAULT_LIMIT);
  sortOrder = signal<'DESC' | 'ASC'>('DESC');
  /** Text search (filterBy=title). */
  searchTerm = signal('');
  /** Category filter (filterBy=category). */
  selectedCategory = signal<string | null>(null);

  isFiltered = computed(() => !!this.selectedCategory() || !!this.searchTerm());

  @ViewChild('searchBox') searchBox?: ElementRef<HTMLInputElement>;

  private readonly search$ = new Subject<string>();
  private categoriesLoaded = false;

  ngOnInit(): void {
    this._route.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params) => {
        const filterBy = params['filterBy'] || 'title';
        const search = params['search'] || '';
        this.selectedCategory.set(filterBy === 'category' ? search : null);
        this.searchTerm.set(filterBy === 'title' ? search : '');
        this.syncSearchBox();

        const queryParams: QueryParams = {
          page: +params['page'] || 1,
          limit: +params['limit'] || DEFAULT_LIMIT,
          sortBy: params['sortBy'] || 'created_at',
          sortOrder: params['sortOrder'] === 'ASC' ? 'ASC' : 'DESC',
          search,
          filterBy,
          relations: ['files'],
          withPagination: true,
        };

        this.currentPage.set(queryParams.page);
        this.limit.set(queryParams.limit);
        this.sortOrder.set(queryParams.sortOrder as 'DESC' | 'ASC');
        this._equipmentsService.findAll(queryParams);

        if (!this.categoriesLoaded) {
          this.categoriesLoaded = true;
          this._equipmentCategoryService.getAllEquipmentCategory();
        }
      });

    this.search$
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((term) => {
        const value = term.trim();
        this.updateRoute({
          filterBy: value ? 'title' : null,
          search: value || null,
          page: 1,
        });
      });
  }

  private updateRoute(params: Partial<QueryParams>) {
    const queryParams: Record<string, unknown> = { ...params };
    if (queryParams['page'] === 1) {
      queryParams['page'] = null;
    }
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  /** Show the URL's search text in the box, unless the person is typing in it. */
  private syncSearchBox() {
    const box = this.searchBox?.nativeElement;
    if (
      box &&
      (typeof document === 'undefined' || box !== document.activeElement)
    ) {
      box.value = this.searchTerm();
    }
  }

  ngAfterViewInit(): void {
    this.syncSearchBox();
  }

  onSearchInput(value: string) {
    this.search$.next(value);
  }

  onPageChange(page: number) {
    this.updateRoute({ page });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onItemCountChange(limit: number) {
    this.updateRoute({
      limit: limit === DEFAULT_LIMIT ? null : limit,
      page: 1,
    });
  }

  onSortChange(sort: 'DESC' | 'ASC') {
    this.updateRoute({ sortOrder: sort === 'DESC' ? null : sort, page: 1 });
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
    this.updateRoute({ filterBy: 'category', search: category, page: 1 });
  }

  /** Back to every item: no category, no search, first page. */
  clearFilters() {
    this.selectedCategory.set(null);
    this.searchTerm.set('');
    if (this.searchBox) this.searchBox.nativeElement.value = '';
    this.updateRoute({ filterBy: null, search: null, page: 1 });
  }
}
