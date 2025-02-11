import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { DeleteResponse } from '@model/delere-response.interface';
import { Equipment } from '@model/equipment';
import { Member } from '@model/member.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class EquipmentService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _equipments = signal<PaginationResponse<Equipment>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });

  private _equipment = signal<Equipment>({
    id: '',
    title: '',
    description: '',
    isPublished: false,
    model: '',
    serial_number: '',
    used_for: '',
    status: '',
    purchase_date: null,
    price: 1,
    quantity: 1,
    files: [],
    categories: [],
    created_at: null,
    updated_at: null,
  });

  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 2,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  equipments: Signal<PaginationResponse<Equipment>> =
    this._equipments.asReadonly();
  equipment = computed(() => this._equipment());
  loading: Signal<boolean> = this._loading.asReadonly();
  queryParams: Signal<QueryParams> = this._queryParams.asReadonly();

  findAll(params?: QueryParams): void {
    const mergedParams = {
      ...this._queryParams(),
      ...params,
    };


    this._queryParams.set(mergedParams);

    this._loading.set(true);

    let httpParams = new HttpParams();
    Object.keys(mergedParams).forEach((key) => {
      const value = mergedParams[key as keyof QueryParams];
      if (Array.isArray(value)) {
        // Handle arrays by appending each item with the key suffixed by `[]`
        value.forEach((item) => {
          httpParams = httpParams.append(`${key}[]`, item);
        });
      } else if (value !== null && value !== undefined) {
        // Handle non-array values
        httpParams = httpParams.append(key, value.toString());
      }
    });


    this._http
      .get<PaginationResponse<Equipment>>(`${environment.apiUrl}equipment`, {
        params: httpParams,
      })
      .subscribe({
        next: (response) => {
          this._equipments.set(response);

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
      .get<Equipment>(`${environment.apiUrl}equipment/${id}`, { params })
      .subscribe({
        next: (response) => {
          this._equipment.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  delete(id: string) {
    this._http
      .delete<DeleteResponse>(`${environment.apiUrl}equipment/${id}`)
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

  create(data: any): Observable<any> {
    this._loading.set(true);

    return this._http.post<any>(`${environment.apiUrl}equipment`, data).pipe(
      map((response) => {
        this._toast.success('Equipment created successfully.');
          this._loading.set(false);
        return response;
      }),
      catchError((error) => {
        this._loading.set(false);
        this._toast.error(error.error.message);
        throw error; // Re-throw the error to be handled by the component
      }),
    );
  }

  update(id: string, data: any): Observable<any> {
    this._loading.set(true);

    return this._http
      .patch<any>(`${environment.apiUrl}equipment/${id}`, data)
      .pipe(
        map((response) => {
          this._toast.success('Equipment  updated successfully.');

          this._loading.set(false);
          return response;
        }),
        catchError((error) => {
          this._loading.set(false);
          this._toast.error(error.error.message);
          throw error; // Re-throw the error to be handled by the component
        }),
      );
  }
}
