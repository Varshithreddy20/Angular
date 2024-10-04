import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = 'http://localhost:60176/api/FoodItems';

  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  updateFoodItem(id: number, available: boolean): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/${id}`, { available })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
