import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YourRequestsService {
  private ordersApiUrl = 'http://localhost:60176/api/orders'; // API URL for orders
  private bookingsApiUrl = 'http://localhost:60176/api/bookings'; // API URL for bookings

  constructor(private authService: AuthService, private http: HttpClient) {}

  // Method to retrieve user's SignUpId
  getUserSignUpId(): number | null {
    return this.authService.getSignUpID();
  }

  // Fetch orders placed by the user with all details
  fetchOrdersBySignUpId(): Observable<any[]> {
    const signUpId = this.getUserSignUpId();
    if (signUpId) {
      return this.http.get<any[]>(`${this.ordersApiUrl}/signup/${signUpId}`);
    } else {
      console.warn('No SignUpId found in session');
      return new Observable<any[]>(); // Return an empty observable
    }
  }

  // Fetch bookings placed by the user with all details
  fetchBookingsBySignUpId(): Observable<any[]> {
    const signUpId = this.getUserSignUpId(); // Get SignUpId from user session or authentication service
    if (signUpId) {
      return this.http
        .get<any[]>(`${this.bookingsApiUrl}/signup/${signUpId}`)
        .pipe(
          catchError((error) => {
            console.error('Error fetching bookings:', error);
            return of([]); // Return empty array on error
          })
        );
    } else {
      console.warn('No SignUpId found in session');
      return of([]); // Return empty array if no SignUpId is found
    }
  }
}
