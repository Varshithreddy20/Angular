import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent {
  selectCuisine(_t22: any) {
    throw new Error('Method not implemented.');
  }

  booking = {
    name: '',
    email: '',
    phone: '',
    persons: 1,
    date: '',
    time: '',
  };

  cuisines: any;
  selectedCuisine: any;
  item: any;

  constructor(private bookingsService: BookingsService) {}

  onSubmit() {
    const formattedDateTime = this.changeDateFormate(
      this.booking.date,
      this.booking.time
    );
    const [formattedDate, formattedTime] = formattedDateTime.split('T');

    const formattedBooking = {
      ...this.booking,
      date: formattedDate,
      time: formattedTime,
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

  // Method to change date and time format
  private changeDateFormate = (
    date: string,
    time: string,
    format: string = '-'
  ): string => {
    let dateobj = new Date(date);
    let parts = time.match(/(\d+):(\d+)/);
    if (!parts) {
      throw new Error('Invalid time format');
    }
    let hours = parseInt(parts[1], 10);
    let minutes = parseInt(parts[2], 10);

    hours = hours % 24;

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
}
