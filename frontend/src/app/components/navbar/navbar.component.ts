import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { IToken } from 'src/app/models/token.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  userName: string = '';
  decodedToken: IToken = {
    exp: 0,
    iat: 0,
    iss: '',
    jti: '',
    name: '',
    nbf: 0,
    prv: '',
    sub: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isUserAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated) {
        const token = sessionStorage.getItem('token');
        if (token) {
          this.decodedToken = jwt_decode(token);
          this.userName = this.decodedToken.name;
        }
      }
    });
  }

  isHomeRouteActive(): boolean {
    return this.router.url === '/';
  }
}
