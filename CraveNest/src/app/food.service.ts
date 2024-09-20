import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = 'http://localhost:60176/api/FoodItems';

  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  updateFoodItem(id: number, available: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, { available });
  }
}
