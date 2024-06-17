import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article-service.service';
import { Article } from '../../interfaces/article';
import { Comment } from '../../interfaces/comment';
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
  comments: Comment[] = [];

  formControls: { [key: string]: FormControl } = {
    content: new FormControl('', [Validators.required])
  };
  errorMessages: { [key: string]: string } = {
    content: ''
  };

  private createCommentSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;
  private fetchCommentsSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id')!;
      this.fetchArticleDetails(parseInt(this.articleId));
      
    });
  }

  fetchArticleDetails(id: number): void {
    this.articleService.getArticleById(id).subscribe({
      next: (data) => {
        this.article = data;
        this.fetchComments(id);
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }
  
 
  fetchComments(id: number): void { 
    this.fetchCommentsSubscription = this.articleService.getCommentsByArticleId(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.comments = data;
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }

  onSubmitComment(): void {
    let newComment = {
      content: this.formControls['content'].value,
      article_id: +this.article.id,
    };
    this.createCommentSubscription = this.articleService.postComment(newComment).subscribe({
      next: (updatedComments: any) => {   //Comment[]         
        console.log(updatedComments);
        this.comments = updatedComments;  
        this.formControls['content'].reset();
        this.formControls['content'].setErrors(null);
      },
      error: (error) => {
        console.error('Erreur : ', error);
      }
    });
  }

  

  ngOnDestroy(): void {
    if (this.createCommentSubscription) {
      this.createCommentSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.fetchCommentsSubscription) {
      this.fetchCommentsSubscription.unsubscribe();
    }
  }
}
