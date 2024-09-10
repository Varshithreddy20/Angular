import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingsComponent } from './bookings/bookings.component';

interface Booking {
  name: string;
  email: string;
  phone: string;
  persons: number;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = 'http://localhost:60176/api/Bookings';

  constructor(private http: HttpClient) {}

  // Create a new booking
  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }
}
