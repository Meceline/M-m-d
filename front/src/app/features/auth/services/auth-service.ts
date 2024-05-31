import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth'; 

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    console.log(registerRequest);
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<any> {
    console.log(loginRequest);
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest);
  }



}
