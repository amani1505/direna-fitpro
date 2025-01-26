import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { GymClass } from '@model/class.interface';
import { DeleteResponse } from '@model/delere-response.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

@Injectable()
export class ClassesServices {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _classes = signal<PaginationResponse<GymClass>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });

  private _allClasses = signal<GymClass[]>([]);
  private _class = signal<GymClass>({
    id: '',
    name: '',
    description: '',
    day: '',
    color: '',
    capacity: 0,
    startTime: '',
    endTime: '',
    instructors: [],
    createdAt: undefined,
    updatedAt: undefined,
  });

  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 12,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  classes: Signal<PaginationResponse<GymClass>> = this._classes.asReadonly();
  allClasses: Signal<GymClass[]> = this._allClasses.asReadonly();
  class: Signal<GymClass> = this._class.asReadonly();
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
      .get<PaginationResponse<GymClass>>(`${environment.apiUrl}classes`, {
        params: httpParams,
      })
      .subscribe({
        next: (response) => {
          this._classes.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  findOne(id: string) {
    this._loading.set(true);

    this._http.get<GymClass>(`${environment.apiUrl}classes/${id}`).subscribe({
      next: (response) => {
        this._class.set(response);
        this._loading.set(false);
      },
      error: (error) => {
        this._toast.error(error.error.message);
        this._loading.set(false);
      },
    });
  }

  getAllClasses(): void {
    this._loading.set(true);

    this._http.get<GymClass[]>(`${environment.apiUrl}classes`).subscribe({
      next: (response) => {
        this._allClasses.set(response);
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
      description?: string;
      day: string;
      color: string;
      capacity: number;
      startTime: string;
      endTime: string;
      staffIds: string[];
    },
  ) {
    this._loading.set(true);

    this._http.post<GymClass>(`${environment.apiUrl}classes`, data).subscribe({
      next: () => {
        this._toast.success('gym class created successfully.');
        if (type === 'findAll') {
          this.findAll();
          this._loading.set(false);
        } else if (type === 'getAll') {
          this.getAllClasses();
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
      description?: string;
      day: string;
      color: string;
      capacity: number;
      startTime: string;
      endTime: string;
      staffIds: string[];
    },
  ) {
    this._loading.set(true);

    this._http
      .patch<GymClass>(`${environment.apiUrl}classes/${id}`, data)
      .subscribe({
        next: () => {
          this._toast.success('Gym Class  updated successfully.');
          if (type === 'findAll') {
            this.findAll();
            this._loading.set(false);
          } else if (type === 'getAll') {
            this.getAllClasses();
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
      .delete<DeleteResponse>(`${environment.apiUrl}classes/${id}`)
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
