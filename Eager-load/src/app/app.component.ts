import { Component } from '@angular/core';
import { CountryComponent } from './country/country.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Eager-load';
}
