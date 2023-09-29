import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IRegistration } from '../models/registration.model';
import { ILogin } from '../models/login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { IToken } from '../models/token.model';
import { IResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.isAuthorized.next(true);
    }
  }

  register(data: IRegistration): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.apiUrl}/api/register`,
      data
    );
  }

  login(data: ILogin): Observable<IResponse> {
    return this.http.post<IResponse>(`${environment.apiUrl}/api/login`, data);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.isAuthorized.next(false);
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.isAuthorized;
  }

  getUserName(): string | null {
    if (this.isAuthorized) {
      const decodedToken: IToken = jwt_decode(sessionStorage.getItem('token')!);
      return decodedToken.name;
    } else {
      return null;
    }
  }
}
