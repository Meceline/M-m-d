import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article-service.service';
import { Subscription } from 'rxjs';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  articles: Article[] = [];

  constructor(private articlesService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.articlesService.getAllArticles().subscribe({
      next: (data: any[]) => {
        console.log(data)
        this.articles = data.map(item => ({
          id: item.id,
          title: item.title,
          content: item.content,
          user: item.user,
          theme: item.theme,
          comments: item.comments, // Add the 'comments' property here
          created_at: new Date(item.created_at),
          updated_at: new Date(item.updated_at)
        }));
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  truncateText(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
