import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { DeleteResponse } from '@model/delere-response.interface';
import { EquipmentCategory } from '@model/equipment';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

@Injectable()
export class EquipmemntCategoryService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _equipmentCategories = signal<PaginationResponse<EquipmentCategory>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });

  private _allEquipmentCategories = signal<Array<EquipmentCategory>>([]);
  private _equipmentCategory = signal<EquipmentCategory>({
    id: '',
    category_name: '',
    equipmemnts: [],
    created_at: undefined,
    updated_at: undefined,
  });

  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 12,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  equipmentCategories: Signal<PaginationResponse<EquipmentCategory>> =
    this._equipmentCategories.asReadonly();
  allEquipmentCategories: Signal<Array<EquipmentCategory>> =
    this._allEquipmentCategories.asReadonly();
  equipmentCategory: Signal<EquipmentCategory> =
    this._equipmentCategory.asReadonly();
  loading: Signal<boolean> = this._loading.asReadonly();
  queryParams: Signal<QueryParams> = this._queryParams.asReadonly();

  findAll(params?: QueryParams): void {
    const mergedParams = {
      ...this._queryParams(),
      ...params,
    };
    this._queryParams.set(mergedParams);

    this._loading.set(true);

    const httpParams = new HttpParams({
      fromObject: mergedParams as Record<string, string>,
    });

    this._http
      .get<PaginationResponse<EquipmentCategory>>(
        `${environment.apiUrl}equipment-category`,
        {
          params: httpParams,
        },
      )
      .subscribe({
        next: (response) => {
          this._equipmentCategories.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  findOne(id: string, equipmentRelations = []) {
    this._loading.set(true);

    const params = new HttpParams({
      fromObject: {
        'relations[]': equipmentRelations, // Add as many relations as needed
      },
    });

    this._http
      .get<EquipmentCategory>(`${environment.apiUrl}equipment-category/${id}`, {
        params,
      })
      .subscribe({
        next: (response) => {
          this._equipmentCategory.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  getAllEquipmentCategory(): void {
    this._loading.set(true);

    this._http
      .get<Array<EquipmentCategory>>(`${environment.apiUrl}equipment-category`)
      .subscribe({
        next: (response) => {
          this._allEquipmentCategories.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  create(
    type: string,
    data: {
      city: string;
      country: string;
      street: string;
      district: string;
      house_no: string;
      road: string;
    },
  ) {
    this._loading.set(true);

    this._http
      .post<EquipmentCategory>(`${environment.apiUrl}equipment-category`, data)
      .subscribe({
        next: (response) => {
          this._toast.success('equipment category created successfully.');
          if (type === 'findAll') {
            this.findAll();
            this._loading.set(false);
          } else if (type === 'getAll') {
            this.getAllEquipmentCategory();
            this._loading.set(false);
          }
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  update(
    type: string,
    id: string,
    data: {
      city: string;
      country: string;
      street: string;
      district: string;
      house_no: string;
      road: string;
    },
  ) {
    this._loading.set(true);

    this._http
      .patch<any>(`${environment.apiUrl}equipment-category/${id}`, data)
      .subscribe({
        next: (response) => {
          this._toast.success('Equipment Category updated successfully.');
          if (type === 'findAll') {
            this.findAll();
            this._loading.set(false);
          } else if (type === 'getAll') {
            this.getAllEquipmentCategory();
            this._loading.set(false);
          }
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  delete(id: string) {
    this._http
      .delete<DeleteResponse>(`${environment.apiUrl}equipment-category/${id}`)
      .subscribe({
        next: (response) => {
          this._toast.success(response.message);
          this.findAll();
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage =
            err.error instanceof ErrorEvent ? err.message : err.error.message;

          this._toast.error(errorMessage);
        },
      });
  }
}
