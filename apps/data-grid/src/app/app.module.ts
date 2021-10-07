import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedAlertDialogModule } from '@srm/shared/alert-dialog';
import { SharedLoadingSpinnerModule } from '@srm/shared/loading-spinner';
import { HttpClientModule } from '@angular/common/http';
import { DataGridGridContentsModule } from '@srm/data-grid/grid-contents';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    SharedAlertDialogModule,
    SharedLoadingSpinnerModule,
    DataGridGridContentsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
