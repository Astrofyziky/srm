import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedAlertDialogModule } from '@srm/shared/alert-dialog';
import { RemoteEntryComponent } from './entry.component';
import { SharedLoadingSpinnerModule } from '@srm/shared/loading-spinner';
import { DataGridGridContentsModule } from '@srm/data-grid/grid-contents';

// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import {MatExpansionModule} from '@angular/material/expansion';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatListModule } from '@angular/material/list';
// import { MatSelectModule } from '@angular/material/select';
// import { CdkAccordionModule } from '@angular/cdk/accordion';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AcademicsApiServiceModule } from '@srm/academics/api-service';
 import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    CommonModule,
    SharedAlertDialogModule,
    DataGridGridContentsModule,
    SharedLoadingSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        runGuardsAndResolvers: "always",
      },
    ]),
    HttpClientModule,
    // MatTableModule,
    // MatSortModule,
    // AcademicsApiServiceModule,
    // MatPaginatorModule,
    // MatExpansionModule,
    // MatFormFieldModule,
    // MatButtonModule,
    // MatRadioModule,
    // MatCheckboxModule,
    // MatListModule,
    // MatSelectModule,
    // CdkAccordionModule,
    // MatIconModule,
    // MatInputModule,
    // FormsModule,
    // ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [RemoteEntryComponent]
})
export class RemoteEntryModule {}
