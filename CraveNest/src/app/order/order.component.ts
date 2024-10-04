import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { OrderService, Order } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  isLoading = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService // Inject DialogService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
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
      item.quantity -= 1;
      this.cartService.updateCart(this.cartItems);
    } else {
      this.removeItem(item);
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.dialogService.openTimedDialog(
      'Clear Cart Success',
      'Your Cart has been cleared successfully.',
      1000
    );
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  placeOrder() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return;
    }

    const signUpId = this.authService.getSignUpID();

    const order: Order = {
      customerName: this.authService.getEmail(),
      customerEmail: this.authService.getEmail(),
      totalAmount: this.totalPrice,
      signUpId: signUpId,
      items: this.cartItems.map((item) => ({
        orderItemId: 0, // Placeholder, to be generated by backend
        orderId: 0, // Placeholder, to be generated by backend
        foodItemId: item.foodItemId,
        quantity: item.quantity,
        unitPrice: item.price,
        foodItemName: 'N/A', // Placeholder, actual name will be populated by backend
      })),
    };

    this.isLoading = true;

    this.orderService.placeOrder(order).subscribe(
      (response) => {
        this.isLoading = false;
        this.cartService.clearCart(); // Clear cart after placing the order

        // Show success message dialog for 1 second
        this.dialogService.openTimedDialog(
          'Order Success',
          'Your order has been placed successfully.',
          1000
        );

        // After dialog, navigate to order confirmation
        setTimeout(() => {
          this.router.navigate(['/order-confirmation'], {
            state: { order: response },
          });
        }, 1000); // Match this delay with the dialog duration
      },
      (error) => {
        this.isLoading = false;
        // Show error message dialog
        this.dialogService.openConfirmationDialog(
          'Order Error',
          'Error placing order. Please try again.'
        );
      }
    );
  }
}
