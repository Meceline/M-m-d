import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../interfaces/theme';
import { User } from '../../articles/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private apiUrl = 'http://localhost:3001/api'; 

  constructor(private http: HttpClient) {}

  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes`);
  }

  subscribeToTheme(id: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/themes/${id}`, {});
  }
 
  getSubscribedThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes/subscribed-themes`);
  }

  unsubscribeFromTheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/themes/${id}/unsubscribe`);
  }
}
