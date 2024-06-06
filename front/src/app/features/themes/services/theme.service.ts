import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private apiUrl = 'http://localhost:3001/api'; 

  constructor(private http: HttpClient) {}

  getAllThemes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/themes`);
  }

  subscribeToTheme(id: number): Observable<any> {
    console.log(id)
    return this.http.post<any>(`${this.apiUrl}/themes/${id}/subscribe`, {});
  }
}
