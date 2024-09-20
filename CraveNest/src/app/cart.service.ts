import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private newOrdersSubject = new BehaviorSubject<any>(null);

  cart$ = this.cartSubject.asObservable();
  newOrders$ = this.newOrdersSubject.asObservable();

  private apiUrl = 'http://localhost:60176/api/orders';

  constructor(private http: HttpClient) {}

  addToCart(item: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const existingItemIndex = currentCart.findIndex(
      (i) => i.name === item.name
    );

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }

    this.cartSubject.next([...currentCart]);
  }

  removeFromCart(item: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter((i) => i.name !== item.name);
    this.cartSubject.next(updatedCart);
  }

  updateCart(items: CartItem[]) {
    this.cartSubject.next([...items]);
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateOrderStatus(
    id: string,
    status: 'accepted' | 'declined'
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { status });
  }
  placeOrder(order: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(this.apiUrl, order).subscribe(
        (response: any) => {
          this.newOrdersSubject.next(response);
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
