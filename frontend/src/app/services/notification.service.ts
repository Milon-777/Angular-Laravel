import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  successMessage(response: IResponse) {
    this.toastr.success(response.message, `${response.code}`, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }

  errorMessage(response: IResponse) {
    this.toastr.error(response.message, `${response.code}`, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }

  notAuthorizedMessage() {
    this.toastr.error("You're not authorized", 'Error', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }

  invalidFieldsMessage() {
    this.toastr.error('All fields must be valid', 'Error', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }

  logoutSuccessMessage() {
    this.toastr.error('Logged out successfully', '200', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }
}
