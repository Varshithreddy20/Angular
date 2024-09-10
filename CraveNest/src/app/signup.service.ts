import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Signup {
  name: string;
  date_of_birth: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:60176/api/User/signup';
  constructor(private http: HttpClient) {}

  // Signup method
  signUp(user: Signup): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
