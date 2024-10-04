import { Component } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { DialogService } from '../dialog.service';
import { AuthService } from '../auth.service'; // Import the AuthService to get SignUpId

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent {
  booking = {
    name: '',
    email: '',
    phone: '',
    persons: 1,
    status: 'pending',
    // Keeping date and time for future use when uncommented
    // date: '',
    // time: ''
  };

  constructor(
    private bookingsService: BookingsService,
    private dialogService: DialogService,
    private authService: AuthService // Inject AuthService
  ) {}

  onSubmit() {
    // Retrieve the SignUpId from the AuthService
    const signUpId = this.authService.getSignUpID(); // Get SignUpId from auth

    // Add the SignUpId to the booking payload
    const formattedBooking = {
      ...this.booking,
      signUpId: signUpId, // Include SignUpId in the booking payload
    };

    this.bookingsService.createBooking(formattedBooking).subscribe(
      (response) => {
        console.log('Booking submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting booking:', error);
      }
    );

    this.dialogService.openTimedDialog(
      'Booking Success',
      'Your reservation has been placed successfully.',
      1000
    );
  }
}
