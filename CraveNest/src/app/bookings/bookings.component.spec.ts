import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingsComponent } from './bookings.component';
import { BookingsService } from '../bookings.service';
import { of } from 'rxjs';

describe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;
  let mockBookingsService = {
    createBooking: jasmine.createSpy('createBooking').and.returnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsComponent],
      providers: [{ provide: BookingsService, useValue: mockBookingsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit booking', () => {
    component.booking = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      persons: 2,
      status: 'Accepted',
    };
    component.onSubmit();
    expect(mockBookingsService.createBooking).toHaveBeenCalled();
  });
});
