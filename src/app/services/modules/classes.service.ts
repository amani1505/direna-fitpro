import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { GymClass } from '@model/class.interface';
import { DeleteResponse } from '@model/delere-response.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class ClassesService {
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
    image: '',
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

  classes: Signal<PaginationResponse<GymClass>> = this._classes.asReadonly();
  allClasses: Signal<GymClass[]> = this._allClasses.asReadonly();
  gymClass = computed(() => this._class());
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

  findOne(id: string, classRelations = []) {
    this._loading.set(true);

    // const params = new HttpParams({
    //   fromObject: {
    //     'relations[]': classRelations, // Add as many relations as needed
    //   },
    // });

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
    // const params = new HttpParams({
    //   fromObject: {
    //     'relations[]': ['instructors'], // Add as many relations as needed
    //   },
    // });

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

  create(data: FormData): Observable<any> {
    this._loading.set(true);

    return this._http.post<any>(`${environment.apiUrl}classes`, data).pipe(
      map((response) => {
        this._toast.success('gym class created successfully.');
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

  update(
    id: string,
    data: {
      name: string;
      description?: string;

      capacity: number;
    },
  ): Observable<any> {
    this._loading.set(true);

    return this._http
      .patch<any>(`${environment.apiUrl}classes/${id}`, data)
      .pipe(
        map((response) => {
          this._toast.success('Class  updated successfully.');

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

  uploadImage(id: string, image: FormData): Observable<any> {
    this._loading.set(true);

    return this._http
      .patch<any>(`${environment.apiUrl}classes/file/${id}`, image)
      .pipe(
        map((response) => {
          this._toast.success('Class image uploaded Successfully.');
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
      .delete<DeleteResponse>(`${environment.apiUrl}classes/${id}`)
      .subscribe({
        next: (response) => {
          this._toast.success(response.message);
          this.getAllClasses();
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage =
            err.error instanceof ErrorEvent ? err.message : err.error.message;

          this._toast.error(errorMessage);
        },
      });
  }
}
