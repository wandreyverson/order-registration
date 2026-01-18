import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }

  createOrder(order: Omit<Orders, 'id' | 'createdAt'>): Observable<Orders> {
    return this.http.post<Orders>(this.apiUrl, order);
  }

  updateStatus(id: string, status: Orders['status']): Observable<Orders> {
    return this.http.patch<Orders>(`${this.apiUrl}/${id}/status`, { status });
  }
}
