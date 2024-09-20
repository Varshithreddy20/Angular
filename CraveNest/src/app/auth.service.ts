import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey: string = 'userToken';
  private emailKey: string = 'userEmail';

  constructor(private router: Router) {}

  setSession(token: string, email: string) {
    sessionStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.emailKey, email);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getEmail(): string | null {
    return sessionStorage.getItem(this.emailKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.emailKey);
    this.router.navigate(['/login']);
  }
}
