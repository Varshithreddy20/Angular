import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { FoodService } from '../food.service';

interface FoodItem {
  foodItemId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  cuisine: string;
  available: boolean;
}

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  cuisines: string[] = ['Italiana', 'Mexican', 'Japanese', 'Indian'];
  selectedCuisine: string = 'Italiana';
  foodItems: FoodItem[] = [];

  constructor(
    private cartService: CartService,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    this.loadFoodItems();
  }

  loadFoodItems() {
    this.foodService.getFoodItems().subscribe({
      next: (items) => {
        this.foodItems = items;
      },
      error: (error) => {
        console.error('Error fetching food items:', error);
      },
    });
  }

  get filteredFoodItems(): FoodItem[] {
    return this.foodItems.filter(
      (item) => item.cuisine === this.selectedCuisine
    );
  }

  selectCuisine(cuisine: string): void {
    this.selectedCuisine = cuisine;
  }

  addToCart(item: FoodItem): void {
    if (item.available) {
      const cartItem: CartItem = {
        foodItemId: item.foodItemId,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      };
      this.cartService.addToCart(cartItem);
      console.log('Item added to cart:', cartItem);
    } else {
      console.log('Item is not available');
    }
  }
}
