import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BookingsService } from '../bookings.service';
import { FoodService } from '../food.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  bookings: any[] = [];
  foodItems: any[] = [];
  orders: any[] = [];
  isLoading = false;
  activeTab: string = 'bookings'; // Handle tab switching
  selectedOrder: any = null; // To store selected order details for modal

  constructor(
    private bookingsService: BookingsService,
    private foodService: FoodService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadAdminData();
  }

  // Load data for the admin panel
  loadAdminData() {
    this.isLoading = true;

    forkJoin({
      bookings: this.bookingsService.getBookings(),
      orders: this.orderService.getOrders(),
      foodItems: this.foodService.getFoodItems(),
    }).subscribe(
      ({ bookings, orders, foodItems }) => {
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

  // Update the status of a booking
  updateBookingStatus(booking: any, status: string) {
    if (!booking.bookingId) {
      console.error('Booking ID is undefined');
      return;
    }

    this.bookingsService
      .updateBookingStatus(booking.bookingId, status)
      .subscribe(
        () => {
          booking.status = status; // Update the status locally after success
          console.log(
            `Booking status updated to ${status} for Booking ID ${booking.bookingId}`
          );
        },
        (error) => {
          console.error(
            `Error updating booking status for Booking ID ${booking.bookingId}:`,
            error
          );
        }
      );
  }

  // Update the status of an order
  updateOrderStatus(order: any, status: string) {
    if (!order.orderId) {
      console.error('Order ID is undefined');
      return;
    }

    this.orderService.updateOrderStatus(order.orderId, status).subscribe(
      () => {
        order.status = status; // Update the local status after success
        console.log(
          `Order status updated to ${status} for Order ID ${order.orderId}`
        );
      },
      (error) => {
        console.error(
          `Error updating order status for Order ID ${order.orderId}:`,
          error
        );
      }
    );
  }

  // View details of an order
  viewOrderDetails(order: any) {
    if (!order.orderId) {
      console.error('Order ID is undefined');
      return;
    }

    this.orderService.getOrderById(order.orderId).subscribe(
      (orderDetails) => {
        this.selectedOrder = orderDetails; // Set the order details for modal
      },
      (error) => {
        console.error(
          `Error retrieving details for Order ID ${order.orderId}:`,
          error
        );
      }
    );
  }

  // Toggle food item availability
  toggleFoodAvailability(foodItem: any) {
    foodItem.isUpdating = true;
    this.foodService
      .updateFoodItem(foodItem.foodItemId, !foodItem.available)
      .subscribe(
        () => {
          foodItem.available = !foodItem.available;
          foodItem.isUpdating = false;
        },
        (error) => {
          foodItem.isUpdating = false;
          console.error('Error updating food item availability:', error);
        }
      );
  }

  // Set the active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
