import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Branch } from '@model/branch.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';

import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _branches = signal<PaginationResponse<Branch>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });

  private _allBranches = signal<Array<Branch>>([]);

  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 2,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  branches: Signal<PaginationResponse<Branch>> = this._branches.asReadonly();
  allBranches: Signal<Array<Branch>> = this._allBranches.asReadonly();
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
      .get<PaginationResponse<Branch>>(`${environment.apiUrl}branch`, {
        params: httpParams,
      })
      .subscribe({
        next: (response) => {
          this._branches.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  getAllBranches(): void {
    this._loading.set(true);

    this._http.get<Array<Branch>>(`${environment.apiUrl}branch`).subscribe({
      next: (response) => {
        this._allBranches.set(response);
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

    this._http.post<Branch>(`${environment.apiUrl}branch`, data).subscribe({
      next: (response) => {
        this._toast.success('branch created successfully.');
        if (type === 'findAll') {
          this.findAll();
          this._loading.set(false);
        } else if (type === 'getAll') {
          this.getAllBranches();
          this._loading.set(false);
        }
      },
      error: (error) => {
        this._toast.error(error.error.message);
        this._loading.set(false);
      },
    });
  }
}
