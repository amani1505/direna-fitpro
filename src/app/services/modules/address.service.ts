import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Address } from '@model/address.interface';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class AddressService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);

  private _addresses = signal<Array<Address>>([]);
  private _loading = signal<boolean>(false);

  addresses: Signal<Array<Address>> = this._addresses.asReadonly();
  loading: Signal<boolean> = this._loading.asReadonly();

  create(data: any): Observable<Address> {
    this._loading.set(true);

    return this._http.post<Address>(`${environment.apiUrl}address`, data).pipe(
      tap((response) => {
        this._toast.success('Address created successfully.');
        this.findAll();
        this._loading.set(false);
      }),
      catchError((error) => {
        this._toast.error(error.error.message);
        this._loading.set(false);
        return throwError(() => error);
      }),
    );
  }

  findAll(): void {
    this._loading.set(true);
    this._http.get<Array<Address>>(`${environment.apiUrl}address`).subscribe(
      (response) => {
        this._addresses.set(response);
        this._loading.set(false);
      },
      (error) => {
        this._toast.error(error.message);
        this._loading.set(false);
      },
    );
  }

  update(id: string, data: any) {
    this._loading.set(true);
    this._http
      .patch<Address>(`${environment.apiUrl}address/${id}`, data)
      .subscribe({
        next: (response) => {
          this._toast.success('Address updated successfully.');
          this.findAll();
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }

  delete(id: string) {
    this._loading.set(true);
    this._http.delete<Address>(`${environment.apiUrl}address/${id}`).subscribe({
      next: (response) => {
        this._toast.success('Address deleted successfully.');
        this.findAll();
        this._loading.set(false);
      },
      error: (error) => {
        this._toast.error(error.error.message);
        this._loading.set(false);
      },
    });
  }
}
