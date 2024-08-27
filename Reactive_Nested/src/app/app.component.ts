import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfilePageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Reactive_Nested';
}
