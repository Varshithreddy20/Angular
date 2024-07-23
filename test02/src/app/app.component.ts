import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  KeyupFiltering(user: HTMLInputElement) {
    console.log(user);
  }
  Keystart(event: any) {
    console.log(event.keyCode);
    if (event.keyCode == 13) {
      console.log('Enter key pressed');
    }
  }
  title: string = 'This loaded dynamically ';
  imgURL: string = 'D:\test02srcappimagesIndia_Farming.jpg.';
  isDisabled: boolean = true;
  isActive: boolean = false;
  fruitName: string = 'banana';

  username: string = 'Varshith';
  buttonClick() {
    console.log('Button Click');
  }
}
