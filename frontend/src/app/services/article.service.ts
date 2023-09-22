import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  url: string = 'http://localhost:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listArticles() {
    return this.httpClient.get<any>(`${this.url}/api/articles`);
  }

  addArticle(article: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.url}/api/articles`,
      article,
      this.httpOptions
    );
  }
}
