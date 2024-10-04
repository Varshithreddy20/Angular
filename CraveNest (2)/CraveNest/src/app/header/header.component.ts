import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check login status on component initialization
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getEmail() || 'User';
    }
  }

  logout(): void {
    // Call the logout method from AuthService
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = '';
  }
}
