import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'body',
    'author',
    'edit',
    'delete',
  ];
  articles: any;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.showArticles();
  }

  showArticles() {
    this.articles = this.articleService.listArticles().subscribe((article) => {
      this.articles = article;
      console.log(this.articles);
    });
  }
}
