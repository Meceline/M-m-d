import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  articleId: string = "";

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id')!;
      this.fetchArticleDetails(parseInt(this.articleId));
    });
  }

  fetchArticleDetails(id: number): void {
    this.articleService.getArticleById(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }
  
}
