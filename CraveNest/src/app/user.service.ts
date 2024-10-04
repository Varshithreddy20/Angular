import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ConfirmPasswordModel,
  UpdateProfileModel,
} from './profile/profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:60176/api/User'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Confirm password method
  confirmPassword(emailId: string, password: string): Observable<boolean> {
    const confirmPasswordPayload: ConfirmPasswordModel = { emailId, password };
    return this.http.post<boolean>(
      `${this.apiUrl}/confirm-password`,
      confirmPasswordPayload
    );
  }

  // Update user details
  updateUserDetails(user: UpdateProfileModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-profile`, user);
  }
}
