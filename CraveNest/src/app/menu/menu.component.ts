import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { CartService, CartItem } from '../cart.service'; // Import CartService

interface MenuItem {
  foodItemId: number; // Use foodItemId as the unique identifier
  name: string;
  description: string;
  price: number;
  image: string;
  cuisine: string;
  available: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  cuisines: string[] = ['Italiana', 'Mexican', 'Japanese', 'Indian'];
  selectedCuisine: string = 'all'; // Start by showing all cuisines
  menuItems: MenuItem[] = []; // Holds all the menu items
  cartItems: CartItem[] = []; // Holds all items in the cart

  constructor(
    private foodService: FoodService,
    private cartService: CartService // Inject CartService to manage cart operations
  ) {}

  ngOnInit() {
    this.loadMenuItems(); // Load all menu items when the component initializes
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart; // Keep track of items in the cart
    });
  }

  // Load the menu items from the FoodService
  loadMenuItems() {
    this.foodService.getFoodItems().subscribe({
      next: (items) => {
        this.menuItems = items; // Populate menuItems
      },
      error: (error) => {
        console.error('Error fetching menu items:', error);
      },
    });
  }

  // Filter menu items by cuisine or show all if selectedCuisine is 'all'
  get filteredMenuItems(): MenuItem[] {
    return this.selectedCuisine === 'all'
      ? this.menuItems
      : this.menuItems.filter((item) => item.cuisine === this.selectedCuisine);
  }

  // Update the selected cuisine when a filter button is clicked
  filterByCuisine(cuisine: string): void {
    this.selectedCuisine = cuisine;
  }

  // Check if a menu item is already in the cart by checking if the item's id is in the cartItems array
  isInCart(item: MenuItem): boolean {
    return this.cartItems.some(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );
  }

  // Get the quantity of an item in the cart
  getQuantity(item: MenuItem): number {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );
    return cartItem ? cartItem.quantity : 0;
  }

  // Add a menu item to the cart
  addToCart(item: MenuItem): void {
    const cartItem: CartItem = {
      foodItemId: item.foodItemId,
      name: item.name,
      price: item.price,
      quantity: 1, // Start with 1 item in the cart
      image: item.image,
    };

    this.cartService.addToCart(cartItem); // Add to cart using CartService
  }

  // Increase the quantity of an item in the cart
  increaseQuantity(item: MenuItem): void {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );
    if (cartItem) {
      this.cartService.addToCart({
        ...cartItem,
        quantity: cartItem.quantity + 1,
      }); // Update the quantity by 1
    }
  }

  // Decrease the quantity of an item in the cart
  decreaseQuantity(item: MenuItem): void {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.foodItemId === item.foodItemId
    );
    if (cartItem) {
      if (cartItem.quantity > 1) {
        this.cartService.addToCart({
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }); // Decrease the quantity by 1
      } else {
        this.cartService.removeFromCart(cartItem); // Remove item from cart if quantity is 1
      }
    }
  }
}
