import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article-service.service';
import { Subscription } from 'rxjs';
import { Article } from '../../interfaces/article';
import { ThemeService } from 'src/app/features/themes/services/theme.service';
import { Theme } from 'src/app/features/themes/interfaces/theme';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  articles: Article[] = [];
  isAscending: boolean = true; 
  subscribedThemes: Set<number> = new Set<number>();


  constructor(private articlesService: ArticleService, private router: Router, private themeService: ThemeService, ) {}

  ngOnInit(): void {
    this.loadSubscribedThemes();
    this.subscription = this.articlesService.getAllArticles().subscribe({
      next: (data: any[]) => {
        this.articles = data.map(item => ({
          id: item.id,
          title: item.title,
          content: item.content,
          user: item.user,
          theme: item.theme,
          comments: item.comments,
          created_at: new Date(item.created_at),
          updated_at: new Date(item.updated_at)
        })).sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
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

  toggleSortOrder(): void {
    this.isAscending = !this.isAscending;
    this.sortArticles();
  }

  sortArticles(): void {
    this.articles.sort((a, b) => {
      if (a.title < b.title) {
        return this.isAscending ? -1 : 1;
      }
      if (a.title > b.title) {
        return this.isAscending ? 1 : -1;
      }
      return 0;
    });
  }

  loadSubscribedThemes(): void {
    this.themeService.getSubscribedThemes().subscribe({
      next: (data: Theme[]) => {
        this.subscribedThemes = new Set(data.map(theme => theme.id));
        console.log(this.subscribedThemes)
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }

}
