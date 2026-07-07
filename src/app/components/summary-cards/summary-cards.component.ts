import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Summary } from '../../services/data.service';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.component.html'
})
export class SummaryCardsComponent {
  @Input({ required: true }) summary!: Summary;

  get cards() {
    return [
      { label: 'Total Sales', value: `$${this.summary.totalSales.toLocaleString()}` },
      { label: 'Total Users', value: this.summary.totalUsers.toLocaleString() },
      { label: 'Total Traffic', value: this.summary.totalTraffic.toLocaleString() },
      { label: 'Conversion Rate', value: `${this.summary.conversionRate}%` }
    ];
  }
}
