import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { CartService } from '../cart.service';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  bookings: any[] = [];
  orders: any[] = [];
  foodItems: any[] = [];

  constructor(
    private bookingsService: BookingsService,
    private cartService: CartService,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    this.loadBookings();
    this.loadOrders();
    this.loadFoodItems();
  }

  loadBookings() {
    this.bookingsService.getBookings().subscribe(
      (bookings) => {
        this.bookings = bookings;
      },
      (error) => {
        console.error('Error loading bookings:', error);
      }
    );
  }

  loadOrders() {
    this.cartService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }

  loadFoodItems() {
    this.foodService.getFoodItems().subscribe(
      (foodItems) => {
        this.foodItems = foodItems;
      },
      (error) => {
        console.error('Error loading food items:', error);
      }
    );
  }

  updateBookingStatus(booking: any, status: 'accepted' | 'declined') {
    booking.status = status;
    console.log(`Booking ${booking.bookingId} ${status}`);
    this.bookingsService
      .updateBookingStatus(booking.bookingId, status)
      .subscribe(
        () => {
          console.log('Booking status updated successfully');
        },
        (error) => {
          console.error('Error updating booking status:', error);
        }
      );
  }

  updateOrderStatus(order: any, status: 'accepted' | 'declined') {
    debugger;
    order.status = status;
    console.log(`Order ${order.orderId} ${status}`);
    this.cartService.updateOrderStatus(order.orderId, status).subscribe(
      () => {
        console.log('Order status updated successfully');
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }

  toggleFoodAvailability(foodItem: any) {
    foodItem.available = !foodItem.available;
    console.log(
      `Food item ${foodItem.foodItemId} availability toggled to ${foodItem.available}`
    );
    this.foodService
      .updateFoodItem(foodItem.foodItemId, foodItem.available)
      .subscribe(
        () => {
          console.log('Food item availability updated');
        },
        (error) => {
          console.error('Error updating food item availability:', error);
        }
      );
  }
}
