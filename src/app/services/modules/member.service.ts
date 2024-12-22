import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { DeleteResponse } from '@model/delere-response.interface';
import { Member } from '@model/member.interface';
import { PaginationResponse } from '@model/PaginationResponse.interface';
import { QueryParams } from '@model/QueryParams.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';
import { response } from 'express';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _members = signal<PaginationResponse<Member>>({
    data: [],
    limit: 0,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });
  private _loading = signal<boolean>(false);
  private _queryParams = signal<QueryParams>({
    page: 1,
    limit: 2,
    sortBy: 'created_at',
    sortOrder: 'DESC',
    withPagination: true,
  });

  members: Signal<PaginationResponse<Member>> = this._members.asReadonly();
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
      .get<PaginationResponse<Member>>(`${environment.apiUrl}member`, {
        params: httpParams,
      })
      .subscribe({
        next: (response) => {
          this._members.set(response);

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
      .delete<DeleteResponse>(`${environment.apiUrl}member/${id}`)
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

  create(data: any): Observable<any> {
    this._loading.set(true);

    return this._http.post<any>(`${environment.apiUrl}member`, data).pipe(
      map((response) => {
        this._toast.success('Member created successfully.');
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
}
