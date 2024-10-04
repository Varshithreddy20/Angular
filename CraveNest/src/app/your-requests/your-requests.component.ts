import { Component, OnInit } from '@angular/core';
import { YourRequestsService } from '../your-requests.service';

@Component({
  selector: 'app-your-requests',
  templateUrl: './your-requests.component.html',
  styleUrls: ['./your-requests.component.scss'],
})
export class YourRequestsComponent implements OnInit {
  signUpId: number | null = null;
  orders: any[] = [];
  bookings: any[] = [];
  selectedTab: string = 'orders'; // Initialize with 'orders' as the default tab

  constructor(private yourRequestsService: YourRequestsService) {}

  ngOnInit() {
    this.signUpId = this.yourRequestsService.getUserSignUpId();

    if (this.signUpId) {
      // Fetch orders
      this.yourRequestsService.fetchOrdersBySignUpId().subscribe(
        (data) => {
          this.orders = data;
          console.log('Orders retrieved:', this.orders);
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );

      // Fetch bookings
      this.yourRequestsService.fetchBookingsBySignUpId().subscribe(
        (data) => {
          this.bookings = data;
          console.log('Bookings retrieved:', this.bookings);
        },
        (error) => {
          console.error('Error fetching bookings:', error);
        }
      );
    } else {
      console.warn('No SignUpId found');
    }
  }

  // Function to handle tab switching
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
