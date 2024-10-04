import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  foodItemId: number;
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
  cart$ = this.cartSubject.asObservable();

  addToCart(item: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const existingItemIndex = currentCart.findIndex(
      (i) => i.foodItemId === item.foodItemId
    );

    if (existingItemIndex !== -1) {
      // Update the existing item's quantity correctly
      currentCart[existingItemIndex].quantity = item.quantity;
    } else {
      // Add a new item with quantity 1
      currentCart.push(item);
    }

    this.cartSubject.next([...currentCart]); // Notify subscribers with updated cart
  }

  removeFromCart(item: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(
      (i) => i.foodItemId !== item.foodItemId
    );
    this.cartSubject.next(updatedCart); // Notify subscribers with updated cart
  }

  updateCart(items: CartItem[]) {
    this.cartSubject.next([...items]);
  }

  clearCart() {
    this.cartSubject.next([]);
  }
}
