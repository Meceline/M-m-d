import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Theme } from 'src/app/features/themes/interfaces/theme';
import { ArticleService } from '../../services/article-service.service';
import { ThemeService } from 'src/app/features/themes/services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  themes: Theme[] = [];
  article = {
    themeId: 0,
    title: '',
    content: ''
  };

  formControls: { [key: string]: FormControl } = {
    theme: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required,]),
  };
  errorMessages: { [key: string]: string } = {
    theme: 'Un thème doit être choisi',
    title: 'Le titre doit être renseigné',
    content: 'Le contenu doit être renseigné',
  };

  constructor(
    private articleService: ArticleService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.themeService.getAllThemes().subscribe({
      next: (themes) => this.themes = themes,
      error: (err) => console.error('Error fetching themes', err)
    });
  }

  onSubmit(): void {
    console.log(this.article.themeId)
    if (this.article.themeId && this.article.title && this.article.content) {
      this.articleService.postArticle(this.article).subscribe({
        next: () => this.router.navigate(['/articles']),
        error: (err) => console.error('Error creating article', err)
      });
    }
  }
  
}
