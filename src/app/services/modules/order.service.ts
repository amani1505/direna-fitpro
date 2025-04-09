// frontend/src/app/order/order.service.ts
import { inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { CreateOrderRequest, Order } from '@model/order.interface';
import { ToastService } from '@service/toast.service';

@Injectable()
export class OrderService {
  private _apiUrl = `${environment.apiUrl}order`;
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);
  private _loading = signal<boolean>(false);

  private _orders = signal<Order[]>([]);

  orders: Signal<Order[]> = this._orders.asReadonly();
  loading: Signal<boolean> = this._loading.asReadonly();

  create(cartId: string, orderData?: CreateOrderRequest): Observable<Order> {
    this._loading.set(true);

    return this._http
      .post<any>(`${this._apiUrl}/cart/${cartId}`, orderData)
      .pipe(
        tap((response) => {
          this._loading.set(false);
        }),
        catchError((error) => {
          this._loading.set(false);
          return throwError(() => error);
        }),
      );
  }

  // getUserOrders(): Observable<Order[]> {
  //   return this._http.get<Order[]>(`${this._apiUrl}`);
  // }


  getUserOrders(): void {
    this._loading.set(true);


    this._http
      .get<Order[]>(`${this._apiUrl}`, )
      .subscribe({
        next: (response) => {
          this._orders.set(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }





  getOrderById(id: number): Observable<Order> {
    return this._http.get<Order>(`${this._apiUrl}/${id}`);
  }
}
