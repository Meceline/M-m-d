import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../interfaces/theme';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  private subscription: Subscription | undefined;
  themes: Theme[] = [];

  constructor(private themesService: ThemeService, private router: Router) {
    this.subscription = this.themesService.getAllThemes().subscribe({
      next: (data) => {
        console.log("ok ", data)
        this.themes = data;
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

  subscribe(id: number){
    this.themesService.subscribeToTheme(id).subscribe({
      next: (data) => {
        console.log("ok ", data)
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });

  }
  
}
