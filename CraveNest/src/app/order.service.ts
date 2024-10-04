import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  customerName: string | null;
  customerEmail: string | null;
  totalAmount: number;
  signUpId: number | null;
  items?: OrderItem[];
}

export interface OrderItem {
  foodItemId: number;
  quantity: number;
  unitPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:60176/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(order: Order): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/${status}`, null);
  }
  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }
}
