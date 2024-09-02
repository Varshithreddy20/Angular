// food.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  cuisines = ['Italian', 'Mexican', 'Japanese', 'Indian'];
  selectedCuisine = 'Italian';
  foodItems = [
    {
      name: 'Pasta',
      description: 'Classic Italian pasta',
      price: 12.99,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Pizza',
      description: 'Margherita pizza',
      price: 14.99,
      image: 'https://via.placeholder.com/150',
    },
    // Add more food items here
  ];

  selectCuisine(cuisine: string) {
    this.selectedCuisine = cuisine;
    // Here you would typically fetch food items for the selected cuisine from a service
  }
}
