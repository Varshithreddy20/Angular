import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem, Order } from '../cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  isLoading = false;
  private cartSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  increaseQuantity(item: CartItem) {
    item.quantity += 1;
    this.cartService.updateCart(this.cartItems);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart(this.cartItems);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  placeOrder() {
    if (!this.authService.isLoggedIn()) {
      console.error('User is not logged in');
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.isLoading = true;

    const signUpId = this.authService.getSignUpID();

    const order: Order = {
      customerName: this.authService.getEmail(),
      customerEmail: this.authService.getEmail(),
      totalAmount: this.totalPrice,
      signUpId: signUpId,
      items: this.cartItems.map((item) => ({
        foodItemId: item.foodItemId,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
    };

    this.cartService.placeOrder(order).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Order placed successfully', response);
        this.router.navigate(['/order-confirmation'], {
          state: { order: response },
        });
      },
      (error) => {
        this.isLoading = false;
        alert('Error placing order. Please try again.');
        console.error('Error placing order', error);
      }
    );
  }
}
