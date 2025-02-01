import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { DeleteResponse } from '@model/delere-response.interface';
import { Staff } from '@model/staff.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class StaffService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _staffs = signal<PaginationResponse<Staff>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });

  private _allStaffs = signal<Staff[]>([]);
  private _staff = signal<Staff>({
    id: '',
    fullname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    isActive: false,
    gender: '',
    branch: undefined,
    role: undefined,
    created_at: undefined,
    updated_at: undefined,
  });

  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 2,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  staffs: Signal<PaginationResponse<Staff>> = this._staffs.asReadonly();
  staff = computed(() => this._staff());
  allStaffs: Signal<Staff[]> = this._allStaffs.asReadonly();
  loading: Signal<boolean> = this._loading.asReadonly();
  queryParams: Signal<QueryParams> = this._queryParams.asReadonly();

  create(data: any): Observable<any> {
    this._loading.set(true);

    return this._http.post<any>(`${environment.apiUrl}staffs`, data).pipe(
      map((response) => {
        this._toast.success('Staff created successfully.');
        this.findAll();
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
      .get<PaginationResponse<Staff>>(`${environment.apiUrl}staffs`, {
        params: httpParams,
      })
      .subscribe({
        next: (response) => {
          this._staffs.set(response);

          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  getAllStaffs(): void {
    this._loading.set(true);

    this._http.get<Staff[]>(`${environment.apiUrl}staffs/trainers`).subscribe({
      next: (response) => {
        this._allStaffs.set(response);
        this._loading.set(false);
      },
      error: (error) => {
        this._toast.error(error.error.message);
        this._loading.set(false);
      },
    });
  }

  findOne(id: string, staffRelations = []) {
    this._loading.set(true);
    const params = new HttpParams({
      fromObject: {
        'relations[]': staffRelations, // Add as many relations as needed
      },
    });
    this._http
      .get<Staff>(`${environment.apiUrl}staffs/${id}`, { params })
      .subscribe({
        next: (response) => {
          this._staff.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  update(id: string, data: any): Observable<any> {
    this._loading.set(true);

    return this._http
      .patch<any>(`${environment.apiUrl}staffs/${id}`, data)
      .pipe(
        map((response) => {
          this._toast.success('Staff updated successfully.');

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

  delete(id: string) {
    this._http
      .delete<DeleteResponse>(`${environment.apiUrl}staffs/${id}`)
      .subscribe({
        next: (response) => {
          console.log(response.message);
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
