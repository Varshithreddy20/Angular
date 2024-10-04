import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // To track if the user is logged in
  username: string = ''; // To display the username

  // Inject AuthService to manage authentication
  constructor(private authService: AuthService) {}

  // Angular lifecycle hook to check login status when the component is initialized
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Method to check login status and set the username if logged in
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      // Fetch the username from AuthService, if available, else display 'User'
      this.username = this.authService.getName() || 'User';
    }
  }

  // Method to log out the user
  logout(): void {
    this.authService.logout();
    // Reset the login state and username
    this.isLoggedIn = false;
    this.username = '';
  }
}
