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
  subscribedThemes: Set<number> = new Set<number>();
  
  constructor(private themesService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.themesService.getAllThemes().subscribe({
      next: (data: Theme[]) => {
        this.themes = data;
        this.loadSubscribedThemes();
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

  loadSubscribedThemes(): void {
    // Charger les thèmes auxquels l'utilisateur est abonné
    this.themesService.getSubscribedThemes().subscribe({
      next: (data: Theme[]) => {
        this.subscribedThemes = new Set(data.map(theme => theme.id));
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }

  subscribe(id: number): void {
    this.themesService.subscribeToTheme(id).subscribe({
      next: () => {
        this.subscribedThemes.add(id);
        console.log("Subscribed to theme ", id);
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }

  unsubscribe(id: number): void {
    this.themesService.unsubscribeFromTheme(id).subscribe({
      next: () => {
        this.subscribedThemes.delete(id);
        console.log("Unsubscribed from theme ", id);
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

}
