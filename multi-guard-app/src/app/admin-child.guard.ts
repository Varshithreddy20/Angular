import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminChildGuard implements CanActivateChild {
  canActivateChild(): boolean {
    const isAdmin = /* Your Admin Logic */ true;
    return isAdmin;
  }
}
