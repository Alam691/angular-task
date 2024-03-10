import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'location',
    'service',
    'suggestion',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _dialog: MatDialog,
    private _FeedbackService: FeedbackService) { }

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
