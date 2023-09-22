import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.articleService.addArticle(this.form.values)
    }
  }
}
