import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

export interface CartItem {
  foodItemId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  customerName: string | null;
  customerEmail: string | null;
  totalAmount: number;
  signUpId: number | null;
  items: OrderItem[];
}

export interface OrderItem {
  foodItemId: number;
  quantity: number;
  unitPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private apiUrl = 'http://localhost:60176/api/Orders';

  constructor(private http: HttpClient) {}

  // Manage cart locally
  addToCart(item: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const existingItemIndex = currentCart.findIndex(
      (i) => i.foodItemId === item.foodItemId
    );

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push({ ...item });
    }

    this.cartSubject.next([...currentCart]);
  }

  removeFromCart(item: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(
      (i) => i.foodItemId !== item.foodItemId
    );
    this.cartSubject.next(updatedCart);
  }

  updateCart(items: CartItem[]) {
    this.cartSubject.next([...items]);
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  // Interact with API
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}/${id}/status`, status, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(catchError(this.handleError));
  }

  placeOrder(order: Order): Observable<any> {
    return this.http.post(this.apiUrl, order).pipe(
      tap(() => this.clearCart()),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
