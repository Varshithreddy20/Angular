import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey: string = 'userToken';
  private emailKey: string = 'userEmail';
  private signUpIdKey: string = 'userSignUpId';
  private nameKey: string = 'userName';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  // Set session data in sessionStorage
  setSession(
    token: string,
    email: string,
    name: string,
    signUpId: number,
    role: number
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (token) sessionStorage.setItem(this.tokenKey, token);
      if (email) sessionStorage.setItem(this.emailKey, email);
      if (name) sessionStorage.setItem(this.nameKey, name);

      if (signUpId !== undefined && signUpId !== null) {
        sessionStorage.setItem(this.signUpIdKey, signUpId.toString());
      } else {
        console.warn('signUpId is undefined or null, skipping setting it.');
      }

      if (role !== undefined && role !== null) {
        sessionStorage.setItem('userRole', role.toString());
      } else {
        console.warn('Role is undefined or null, skipping setting it.');
      }
    }
  }

  // Get the user's role from sessionStorage
  getRole(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const role = sessionStorage.getItem('userRole');
      return role ? +role : null;
    }
    return null;
  }

  // Get the authentication token from sessionStorage
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Get the user's email from sessionStorage
  getEmail(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.emailKey);
    }
    return null;
  }

  // Get the user's name from sessionStorage
  getName(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.nameKey); // Retrieve the user's name
    }
    return null;
  }

  // Get the user's sign-up ID from sessionStorage
  getSignUpID(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const signUpId = sessionStorage.getItem(this.signUpIdKey);
      return signUpId ? +signUpId : null;
    }
    return null;
  }

  // Check if the user is logged in by verifying the presence of a token
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken();
    }
    return false;
  }

  // Logout the user by clearing session data and navigating to the login page
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.emailKey);
      sessionStorage.removeItem(this.signUpIdKey);
      sessionStorage.removeItem(this.nameKey); // Remove user's name
      sessionStorage.removeItem('userRole'); // Also remove user role
    }
    this.router.navigate(['/login']);
  }
}
