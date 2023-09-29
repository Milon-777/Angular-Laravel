import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const notification = inject(NotificationService);

  return auth.isUserAuthenticated().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        notification.notAuthorizedMessage();
        return false;
      }
    })
  );
};
