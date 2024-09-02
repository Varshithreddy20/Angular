import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidationService {
  private takenEmails = ['test@example.com', 'taken@example.com'];

  isEmailTaken(email: string) {
    const isTaken = this.takenEmails.includes(email);
    return of(isTaken).pipe(delay(500));
  }
}
