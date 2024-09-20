import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  cuisine: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  cuisines: string[] = ['Italiana', 'Mexican', 'Japanese', 'Indian'];
  selectedCuisine: string = 'all';
  menuItems: MenuItem[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.foodService.getFoodItems().subscribe({
      next: (items) => {
        this.menuItems = items;
      },
      error: (error) => {
        console.error('Error fetching menu items:', error);
        // You might want to add user-facing error handling here
      },
    });
  }

  get filteredMenuItems(): MenuItem[] {
    return this.selectedCuisine === 'all'
      ? this.menuItems
      : this.menuItems.filter((item) => item.cuisine === this.selectedCuisine);
  }

  filterByCuisine(cuisine: string): void {
    this.selectedCuisine = cuisine;
  }
}
