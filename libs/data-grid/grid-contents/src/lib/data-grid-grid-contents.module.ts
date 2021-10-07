import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridContentsComponent } from './grid-contents/grid-contents.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedAlertDialogModule } from '@srm/shared/alert-dialog';
import { SharedLoadingSpinnerModule } from '@srm/shared/loading-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GridContentsComponent
      }
    ]),
    HttpClientModule,
    BrowserModule,
    CommonModule,
    SharedAlertDialogModule,
    SharedLoadingSpinnerModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    CdkAccordionModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    GridContentsComponent
  ],
  exports: [GridContentsComponent],
  entryComponents: [GridContentsComponent],
  bootstrap:[GridContentsComponent]
})
export class DataGridGridContentsModule {}
