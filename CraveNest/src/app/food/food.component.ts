import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CartService],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  navigateToCart() {
    throw new Error('Method not implemented.');
  }
  cuisines = ['Italian', 'Mexican', 'Japanese', 'Indian'];
  selectedCuisine = 'Italian';
  foodItems = [
    // Italian
    {
      name: 'Pasta',
      description: 'Classic Italian pasta',
      price: 12.99,
      image: 'images/pasta.jpg',
      cuisine: 'Italian',
    },
    {
      name: 'Pizza',
      description: 'Margherita pizza',
      price: 14.99,
      image: '/images/pizza.jpg',
      cuisine: 'Italian',
    },
    {
      name: 'Lasagna',
      description: 'Layered pasta with cheese',
      price: 15.99,
      image: 'images/lasanga.jpg',
      cuisine: 'Italian',
    },
    {
      name: 'Risotto',
      description: 'Creamy risotto with mushrooms',
      price: 13.99,
      image: 'images/Risotto.jpg',
      cuisine: 'Italian',
    },
    {
      name: 'Gnocchi',
      description: 'Potato dumplings in tomato sauce',
      price: 11.99,
      image: 'images/gnocchi.jpg',
      cuisine: 'Italian',
    },

    // Mexican
    {
      name: 'Tacos',
      description: 'Mexican beef tacos',
      price: 10.99,
      image: 'images/Tacos.jpg',
      cuisine: 'Mexican',
    },
    {
      name: 'Burrito',
      description: 'Stuffed burrito with beans and rice',
      price: 12.99,
      image: 'images/burritoo.jpg',
      cuisine: 'Mexican',
    },
    {
      name: 'Quesadilla',
      description: 'Cheese-filled tortilla',
      price: 8.99,
      image: 'images/Quesadilla.jpg',
      cuisine: 'Mexican',
    },
    {
      name: 'Nachos',
      description: 'Tortilla chips with cheese and toppings',
      price: 9.99,
      image: 'images/nachos.jpg',
      cuisine: 'Mexican',
    },
    {
      name: 'Enchiladas',
      description: 'Rolled tortillas with sauce',
      price: 11.99,
      image: 'images/Enchiladas.jpg',
      cuisine: 'Mexican',
    },

    // Japanese
    {
      name: 'Sushi',
      description: 'Fresh sushi rolls',
      price: 16.99,
      image: 'images/sushi.jpg',
      cuisine: 'Japanese',
    },
    {
      name: 'Ramen',
      description: 'Noodle soup with pork and egg',
      price: 13.99,
      image: 'images/ramen.jpg',
      cuisine: 'Japanese',
    },
    {
      name: 'Tempura',
      description: 'Battered and fried seafood',
      price: 12.99,
      image: 'images/tempuraa.jpg',
      cuisine: 'Japanese',
    },
    {
      name: 'Teriyaki',
      description: 'Grilled chicken with teriyaki sauce',
      price: 14.99,
      image: 'images/teriyaki.jpg',
      cuisine: 'Japanese',
    },
    {
      name: 'Sashimi',
      description: 'Slices of raw fish',
      price: 17.99,
      image: 'images/sashimi.jpg',
      cuisine: 'Japanese',
    },

    // Indian
    {
      name: 'Curry',
      description: 'Spicy Indian curry',
      price: 13.99,
      image: 'images/indiancurry.jpg',
      cuisine: 'Indian',
    },
    {
      name: 'Biryani',
      description: 'Aromatic rice with spices',
      price: 14.99,
      image: 'images/biriyani.jpg',
      cuisine: 'Indian',
    },
    {
      name: 'Samosa',
      description: 'Deep-fried pastry with spiced filling',
      price: 6.99,
      image: 'images/samosaa.jpg',
      cuisine: 'Indian',
    },
    {
      name: 'Paneer Tikka',
      description: 'Grilled paneer cubes',
      price: 11.99,
      image: 'images/panner.jpg',
      cuisine: 'Indian',
    },
    {
      name: 'Naan',
      description: 'Indian flatbread',
      price: 4.99,
      image: 'images/naan.jpg',
      cuisine: 'Indian',
    },
  ];

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((data) => {
      console.log(data);
    });
  }

  get filteredFoodItems() {
    return this.foodItems.filter(
      (item) => item.cuisine === this.selectedCuisine
    );
  }

  selectCuisine(cuisine: string) {
    this.selectedCuisine = cuisine;
  }

  addToCart(item: any) {
    this.cartService.addToCart({
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  }
}
