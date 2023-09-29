import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from 'src/app/models/response.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css'],
})
export class ModalPopupComponent {
  form: FormGroup = new FormGroup({});
  userName: string | null = null;

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private articleService: ArticleService,
    private notification: NotificationService,
    public dialogref: MatDialogRef<ModalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userName = this.auth.getUserName();
    this.form = this.initializeForm();
    this.loadCurrentArticle(this.data.articleId);
  }

  private initializeForm(): FormGroup {
    return this.builder.group({
      title: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ),
      content: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10000),
        ])
      ),
      author: [this.userName, { disabled: true }],
    });
  }

  private loadCurrentArticle(articleId: number) {
    this.articleService.getOne(articleId).subscribe((res: IResponse) => {
      if (res.status === 1) {
        const { title, content, author } = res.data;
        this.form.setValue({
          title: title,
          content: content,
          author: author,
        });
      } else {
        this.notification.errorMessage(res);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.articleService
        .update(this.form.value, this.data.articleId)
        .subscribe((res: IResponse) => {
          if (res.status === 1) {
            this.notification.successMessage(res);
            this.dialogref.close();
          } else {
            this.notification.errorMessage(res);
          }
        });
      this.clearForm();
    } else {
      this.notification.invalidFieldsMessage();
    }
  }

  clearForm() {
    this.form.reset({ author: this.userName });
    this.form.markAsUntouched();
  }
}
