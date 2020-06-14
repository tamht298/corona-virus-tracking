import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SummaryComponent} from './summary/summary.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsComponent} from './charts/charts.component';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    ChartsComponent,
    SearchPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    MatSortModule,
    NgxSkeletonLoaderModule
  ],
  providers: [SearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
