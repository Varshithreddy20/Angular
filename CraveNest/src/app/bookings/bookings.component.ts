import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  booking = {
    name: '',
    email: '',
    phone: '',
    persons: 1,
    date: '',
    time: '',
  };

  onSubmit() {
    console.log('Booking submitted:', this.booking);
  }
}
