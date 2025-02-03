import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { DeleteResponse } from '@model/delere-response.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { Roles } from '@model/role.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

@Injectable()
export class RolesService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _roles = signal<PaginationResponse<Roles>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });

  private _allRoles = signal<Array<Roles>>([]);

  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 12,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  roles: Signal<PaginationResponse<Roles>> = this._roles.asReadonly();
  allRoles: Signal<Array<Roles>> = this._allRoles.asReadonly();

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
      .get<PaginationResponse<Roles>>(`${environment.apiUrl}roles`, {
        params: httpParams,
      })
      .subscribe({
        next: (response) => {
          this._roles.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  getAllRolesExceptUser(): void {
    this._loading.set(true);

    this._http
      .get<Array<Roles>>(`${environment.apiUrl}roles/except-user`)
      .subscribe({
        next: (response) => {
          this._allRoles.set(response);
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
      name: string;
      description: string;
    },
  ) {
    this._loading.set(true);

    this._http.post<Roles>(`${environment.apiUrl}roles`, data).subscribe({
      next: (response) => {
        this._toast.success('role created successfully.');
        if (type === 'findAll') {
          this.findAll();
          this._loading.set(false);
        } else if (type === 'getAll') {
          this.getAllRolesExceptUser();
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
      name: string;
      description: string;
    },
  ) {
    this._loading.set(true);

    this._http.patch<any>(`${environment.apiUrl}roles/${id}`, data).subscribe({
      next: (response) => {
        this._toast.success('Role updated successfully.');
        if (type === 'findAll') {
          this.findAll();
          this._loading.set(false);
        } else if (type === 'getAll') {
          this.getAllRolesExceptUser();
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
      .delete<DeleteResponse>(`${environment.apiUrl}role/${id}`)
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
