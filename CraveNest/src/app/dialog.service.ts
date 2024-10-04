import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  // Existing method for user-confirmed dialogs
  openConfirmationDialog(title: string, message: string): Observable<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title, message },
    });
    return dialogRef.afterClosed();
  }

  // New method to open a timed dialog without the OK button
  openTimedDialog(
    title: string,
    message: string,
    duration: number = 500
  ): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title, message, hideCloseButton: true }, // Pass the hideCloseButton flag
      disableClose: true, // Disable manual closing for timed dialogs
    });

    setTimeout(() => {
      dialogRef.close();
    }, duration);
  }
}
