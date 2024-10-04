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

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any // Inject PLATFORM_ID to check if it's browser
  ) {}

  setSession(
    token: string,
    email: string,
    signUpId: number | undefined,
    role: number | undefined
  ) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.tokenKey, token);
      sessionStorage.setItem(this.emailKey, email);

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

  getRole(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const role = sessionStorage.getItem('userRole');
      return role ? +role : null;
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getEmail(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.emailKey);
    }
    return null;
  }

  getSignUpID(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const signUpId = sessionStorage.getItem(this.signUpIdKey);
      return signUpId ? +signUpId : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken();
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.emailKey);
      sessionStorage.removeItem(this.signUpIdKey);
    }
    this.router.navigate(['/login']);
  }
}
