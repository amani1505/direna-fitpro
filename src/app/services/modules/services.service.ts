import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { DeleteResponse } from '@model/delere-response.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { Services } from '@model/services.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

@Injectable()
export class ServicesService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _services = signal<PaginationResponse<Services>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });

  private _allServices = signal<Array<Services>>([]);

  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 2,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  services: Signal<PaginationResponse<Services>> = this._services.asReadonly();
  allServices: Signal<Array<Services>> = this._allServices.asReadonly();
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
      .get<PaginationResponse<Services>>(`${environment.apiUrl}service`, {
        params: httpParams,
      })
      .subscribe({
        next: (response) => {
          this._services.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  getAllServices(): void {
    this._loading.set(true);

    this._http.get<Array<Services>>(`${environment.apiUrl}service`).subscribe({
      next: (response) => {
        this._allServices.set(response);
        this._loading.set(false);
      },
      error: (error) => {
        this._toast.error(error.error.message);
        this._loading.set(false);
      },
    });
  }
  create(type: string, data: { name: string; description: string }) {
    this._loading.set(true);

    this._http.post<Services>(`${environment.apiUrl}service`, data).subscribe({
      next: (response) => {
        this._toast.success('Service created successfully.');
        if (type === 'findAll') {
          this.findAll();
          this._loading.set(false);
        } else if (type === 'getAll') {
          this.getAllServices();
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
    data: { name: string; description: string },
  ) {
    this._loading.set(true);

    this._http
      .patch<any>(`${environment.apiUrl}service/${id}`, data)
      .subscribe({
        next: (response) => {
          this._toast.success('Service updated successfully.');
          if (type === 'findAll') {
            this.findAll();
            this._loading.set(false);
          } else if (type === 'getAll') {
            this.getAllServices();
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
      .delete<DeleteResponse>(`${environment.apiUrl}service/${id}`)
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
