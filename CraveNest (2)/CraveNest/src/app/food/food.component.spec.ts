import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodComponent } from './food.component';
import { CartService } from '../cart.service';
import { of } from 'rxjs';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;
  let mockCartService = {
    cart$: of([]),
    addToCart: jasmine.createSpy('addToCart'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToCart on item selection', () => {
    const item = {
      name: 'Pizza',
      price: 15,
      image: 'pizza.jpg',
      cuisine: 'Italian',
    };
    component.addToCart(item);
    expect(mockCartService.addToCart).toHaveBeenCalledWith({
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  });
});
