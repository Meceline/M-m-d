import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { User } from '../../articles/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth'; 

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest);
  }

  //  getUserProfile(): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}/users/profile`);
  // }

  // updateUserProfile(user: User): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/users/profile`, user);
  // }
  
}
