import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [CommonModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AlertDialogComponent
  ],
  exports: [AlertDialogComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} },
  ]
})
export class SharedAlertDialogModule {}
