import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingsComponent } from './bookings.component';
import { BookingsService } from '../bookings.service';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [BookingsComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild([{ path: '', component: BookingsComponent }]),
  ],
  exports: [HeaderModule, FooterModule],
})
export class BookingsModule {}
