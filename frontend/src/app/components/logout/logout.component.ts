import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    private auth: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
    this.notification.logoutSuccessMessage();
  }
}
