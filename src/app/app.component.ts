import { Component, ViewChild, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackService } from './services/feedback.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Task';



  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'location',
    'service',
    'suggestion',
  ]; dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _FeedbackService: FeedbackService) { }

  openFeedbackForm() {
    const dialogRef = this._dialog.open(FeedbackFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (value: any) => {
        if (value) {
          this.getFeedbackList();
        }
      },
    })

  }



  ngOnInit(): void {
    this.getFeedbackList();
  }

  getFeedbackList() {
    this._FeedbackService.getFeedbackList().subscribe({
      next: (value: any) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }, error: (err: any) => {
        console.error(err);
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
