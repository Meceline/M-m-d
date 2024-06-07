import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article-service.service';
import { Article } from '../../interfaces/article';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  articleId: string = "";
  article!: Article;
  
  formControls: { [key: string]: FormControl } = {
    content: new FormControl('', [Validators.required])
  };
  errorMessages: { [key: string]: string } = {
    content: ''
  };

  private createCommentSubscription: Subscription | null = null;
  
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
        this.article = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }
  

  onSubmitComment(): void {
    let newComment = {
      content: this.formControls['content'].value,
      articleId: this.article.id,
    };
      this.createCommentSubscription = this.articleService.createComment(newComment).subscribe({
        next: createdComment => {
          console.log(createdComment);
        },
        error: error => {
          throw error;
        }
      });
    
  }

  ngOnDestroy(): void {
    if (this.createCommentSubscription) {
      this.createCommentSubscription.unsubscribe();
    }
  }
}
