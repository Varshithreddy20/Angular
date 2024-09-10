// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(item: CartItem) {
    const currentCart = this.cart.value;
    const itemIndex = currentCart.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (itemIndex >= 0) {
      currentCart[itemIndex].quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }
    console.log(currentCart);

    this.cart.next([...currentCart]);
  }

  removeFromCart(itemName: string) {
    const updatedCart = this.cart.value.filter(
      (item) => item.name !== itemName
    );
    this.cart.next(updatedCart);
  }

  clearCart() {
    this.cart.next([]);
  }
}
