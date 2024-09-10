import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Simulate authentication
    localStorage.setItem('authenticated', 'true');
    this.router.navigate(['/dashboard']);
  }
}
