import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { IResponse } from 'src/app/models/response.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { IArticle } from 'src/app/models/article';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  dataSource!: MatTableDataSource<IArticle>;
  displayedColumns: string[] = [];
  isAuthenticated: boolean = false;
  isEditing: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscribeToAuthChanges();
    this.showArticles();
  }

  private initializeColumns() {
    if (this.isAuthenticated) {
      this.displayedColumns = [
        'id',
        'title',
        'content',
        'author',
        'edit',
        'delete',
      ];
    } else {
      this.displayedColumns = ['id', 'title', 'content', 'author'];
    }
  }

  private subscribeToAuthChanges() {
    this.auth.isUserAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.initializeColumns();
    });
  }

  private showArticles() {
    this.articleService.getAll().subscribe((articles: IArticle[]) => {
      this.dataSource = new MatTableDataSource<IArticle>(articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openModal(articleId: number) {
    const dialogRef = this.dialog.open(ModalPopupComponent, {
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      width: '50%',
      data: {
        articleId: articleId,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.showArticles();
    });
  }

  deleteArticle(articleId: number) {
    this.articleService.delete(articleId).subscribe((res: IResponse) => {
      if (res.status === 1) {
        this.notification.successMessage(res);
        this.showArticles();
      } else {
        this.notification.errorMessage(res);
      }
    });
  }
}
