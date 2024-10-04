import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();

    if (role === 2) {
      // role 2 is admin
      return true; // Allows access if role is admin
    }

    // Redirect to home if not admin
    this.router.navigate(['/home']);
    return false; // Prevent access if not admin
  }
}
