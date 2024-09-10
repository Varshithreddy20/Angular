import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  providers: [CartService],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  cartItems$ = this.cartService.cart$;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((data) => {
      console.log(data);
    });
  }
}
