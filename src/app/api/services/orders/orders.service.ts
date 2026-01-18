import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createOrder(order: Omit<Orders, 'id' | 'createdAt'>): Observable<Orders> {
    return this.http.post<Orders>(this.apiUrl, order, { headers: this.getHeaders() });
  }

  updateStatus(id: string, status: Orders['status']): Observable<Orders> {
    return this.http.patch<Orders>(`${this.apiUrl}/${id}/status`, { status }, { headers: this.getHeaders() });
  }
}