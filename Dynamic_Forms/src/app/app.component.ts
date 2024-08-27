import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicFormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Dynamic_Forms';
}
