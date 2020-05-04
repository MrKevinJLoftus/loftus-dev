import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar: MatSnackBar) { }

  show(message: string, closeBtnText = 'Dismiss') {
    this.snackbar.open(message, closeBtnText);
  }
}
