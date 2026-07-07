import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // Standalone components imported directly into the module
    SummaryCardsComponent,
    SalesChartComponent,
    DataTableComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
