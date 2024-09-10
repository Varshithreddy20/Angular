import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverGuard implements Resolve<any> {
  resolve(): Observable<any> {
    const profileData = { name: 'John Doe', email: 'john@example.com' };
    return of(profileData); // Simulate an API call
  }
}
