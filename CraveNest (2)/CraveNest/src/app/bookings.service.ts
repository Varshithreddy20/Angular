import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = 'http://localhost:60176/api/bookings';

  constructor(private http: HttpClient) {}

  // Get all bookings
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get booking by ID
  getBookingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new booking
  createBooking(booking: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, booking);
  }

  // Update booking
  updateBooking(booking: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, booking);
  }

  // Soft delete a booking
  softDeleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Restore a booking
  restoreBooking(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/restore`, null);
  }

  // Update booking status
  updateBookingStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });
  }
}
