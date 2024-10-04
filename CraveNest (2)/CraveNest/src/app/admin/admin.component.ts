import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  isLoading = false;

  constructor(
    private bookingsService: BookingsService,
    private cartService: CartService,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    console.log('Fetching bookings, orders, and food items...');

    forkJoin({
      bookings: this.bookingsService.getBookings(),
      orders: this.cartService.getOrders(),
      foodItems: this.foodService.getFoodItems(),
    }).subscribe(
      ({ bookings, orders, foodItems }) => {
        console.log('Admin data loaded successfully:', {
          bookings,
          orders,
          foodItems,
        });
        this.bookings = bookings;
        this.orders = orders;
        this.foodItems = foodItems;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading admin data:', error);
        this.isLoading = false;
      }
    );
  }

  updateBookingStatus(booking: any, status: 'accepted' | 'declined') {
    booking.status = status;
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

  updateOrderStatus(order: any, status: 'Accepted' | 'Declined') {
    this.cartService.updateOrderStatus(order.orderId, status).subscribe(
      () => {
        order.status = status;
        console.log(`Order status updated to ${status} for Order ID ${order.orderId}`);
      },
      (error) => {
        console.error(`Error updating order status for Order ID ${order.orderId}:`, error);
      }
    );
  }

  toggleFoodAvailability(foodItem: any) {
    foodItem.isUpdating = true;
    this.foodService
      .updateFoodItem(foodItem.foodItemId, !foodItem.available)
      .subscribe(
        () => {
          foodItem.available = !foodItem.available;
          foodItem.isUpdating = false;
          console.log('Food item availability updated');
        },
        (error) => {
          foodItem.isUpdating = false;
          console.error('Error updating food item availability:', error);
        }
      );
  }
}