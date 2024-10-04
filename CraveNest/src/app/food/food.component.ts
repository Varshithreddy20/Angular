import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { FoodService } from '../food.service';
import { DialogService } from '../dialog.service';

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
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private foodService: FoodService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadFoodItems();
    this.cartService.cart$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
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
      const cartItem = this.cartItems.find(
        (cartItem) => cartItem.foodItemId === item.foodItemId
      );

      if (cartItem) {
        // If the item is already in the cart, increase its quantity by 1
        this.cartService.addToCart({
          ...cartItem,
          quantity: cartItem.quantity + 1,
        });
      } else {
        // If the item is not in the cart, add it with quantity 1
        const newItem: CartItem = {
          foodItemId: item.foodItemId,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        };
        this.cartService.addToCart(newItem);
      }

      this.dialogService.openTimedDialog(
        'Success',
        'Item added to cart successfully',
        600
      );
    } else {
      console.log('Item is not available');
    }
  }

  isInCart(item: FoodItem): boolean {
    return this.cartItems.some(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );
  }

  getCartItemQuantity(item: FoodItem): number {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );
    return cartItem ? cartItem.quantity : 0;
  }

  increaseQuantity(item: FoodItem): void {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );

    if (cartItem) {
      // Ensure the quantity is incremented by 1
      this.cartService.addToCart({
        ...cartItem,
        quantity: cartItem.quantity + 1,
      });
    }
  }

  decreaseQuantity(item: FoodItem): void {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );

    if (cartItem) {
      if (cartItem.quantity > 1) {
        // Ensure the quantity is decremented by 1
        this.cartService.addToCart({
          ...cartItem,
          quantity: cartItem.quantity - 1,
        });
      } else {
        // If quantity is 1 and decrement is pressed, remove the item from the cart
        this.cartService.removeFromCart(cartItem);
      }
    }
  }
}
