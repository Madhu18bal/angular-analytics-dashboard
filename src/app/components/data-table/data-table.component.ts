import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../services/data.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html'
})
export class DataTableComponent {
  @Input({ required: true }) transactions: Transaction[] = [];

  search = '';
  statusFilter = 'All';
  sortKey: keyof Transaction = 'date';
  sortDir: 'asc' | 'desc' = 'desc';

  get filtered(): Transaction[] {
    let rows = this.transactions.filter((t) =>
      t.customer.toLowerCase().includes(this.search.toLowerCase())
    );
    if (this.statusFilter !== 'All') {
      rows = rows.filter((t) => t.status === this.statusFilter);
    }
    const dir = this.sortDir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) return -1 * dir;
      if (a[this.sortKey] > b[this.sortKey]) return 1 * dir;
      return 0;
    });
  }

  toggleSort(key: keyof Transaction): void {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'asc';
    }
  }
}
