import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingsService } from '../bookings.service';
import { BookingsModule } from './bookings.module';

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

  constructor(private bookingsService: BookingsService) {}

  onSubmit() {
    // You can enable this section when date and time inputs are available
    /*
    const formattedDateTime = this.changeDateFormate(
      this.booking.date,
      this.booking.time
    );
    const [formattedDate, formattedTime] = formattedDateTime.split('T');
    */

    const formattedBooking = {
      ...this.booking,
      // Uncomment once you bring date and time inputs back
      // date: formattedDate,
      // time: formattedTime,
    };

    this.bookingsService.createBooking(formattedBooking).subscribe(
      (response) => {
        console.log('Booking submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting booking:', error);
      }
    );
  }

  // This method can be used when date and time are reintroduced
  /*
  private changeDateFormate = (
    date: string,
    time: string,
    format: string = '-'
  ): string => {
    const dateobj = new Date(date);
    const parts = time.match(/(\d+):(\d+)/);

    if (!parts) throw new Error('Invalid time format');

    const hours = parseInt(parts[1], 10) % 24;
    const minutes = parseInt(parts[2], 10);

    dateobj.setHours(hours, minutes, 0, 0);

    const addZeroToValue = (value: string) => value.padStart(2, '0');

    return (
      [
        dateobj.getFullYear(),
        addZeroToValue((dateobj.getMonth() + 1).toString()),
        addZeroToValue(dateobj.getDate().toString()),
      ].join(format) +
      'T' +
      [
        addZeroToValue(dateobj.getHours().toString()),
        addZeroToValue(dateobj.getMinutes().toString()),
        '00',
      ].join(':')
    );
  };
  */
}
