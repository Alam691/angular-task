import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(massage: string, action: string) {
    this._snackBar.open(massage, action, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
}
