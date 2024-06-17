import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/features/articles/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserProfilService {

  private apiUrl = 'http://localhost:3001/api/users'; 

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profil`);
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profil`, user);
  }
}
