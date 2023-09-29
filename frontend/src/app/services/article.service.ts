import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IArticle } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IArticle[]> {
    return this.httpClient.get<IArticle[]>(
      `${environment.apiUrl}/api/articles`
    );
  }

  getOne(articleId: number): Observable<IArticle> {
    return this.httpClient.get<IArticle>(
      `${environment.apiUrl}/api/articles/${articleId}`
    );
  }

  create(article: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/api/articles`,
      article
    );
  }

  update(article: any, articleId: number) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/api/articles/${articleId}`,
      article
    );
  }

  delete(articleId: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/api/articles/${articleId}`
    );
  }
}
