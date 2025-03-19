// frontend/src/app/order/order.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CreateOrderRequest, Order } from '@model/order.interface';

@Injectable()
export class OrderService {
  private _apiUrl = `${environment.apiUrl}orders`;
  private _http = inject(HttpClient);

  createOrder(
    cartId: string,
    orderData: CreateOrderRequest,
  ): Observable<Order> {
    return this._http.post<Order>(`${this._apiUrl}/cart/${cartId}`, orderData);
  }

  getUserOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(`${this._apiUrl}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this._http.get<Order>(`${this._apiUrl}/${id}`);
  }
}
