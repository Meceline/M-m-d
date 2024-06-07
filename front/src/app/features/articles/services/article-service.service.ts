import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:3001/api'; 

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/articles/${id}`, {});
  }

  createComment(newComment: { articleId: number; content: string }): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, newComment);
  }

}
