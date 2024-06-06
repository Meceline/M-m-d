import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  private subscription: Subscription | undefined;
  articles: any;

  constructor(private articlesService: ArticleService, private router: Router) {
    this.subscription = this.articlesService.getAllArticles().subscribe({
      next: (data) => {
        console.log("ok ", data)
        this.articles = data;
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }

  truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }
  
}
