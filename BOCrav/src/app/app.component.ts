import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoodComponent } from './food/food.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FoodComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BOCrav';
}
