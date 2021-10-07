import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '@srm/shared/alert-dialog';

@Component({
  selector: 'srm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'data-grid';
  constructor(public dialog: MatDialog) { }


  public openDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: {
        Header: 'Hello',
        Message: 'I am a dialog being opened with Webpack',
        ConfirmButtonText: 'Okay'
      }
    });
  }
}
