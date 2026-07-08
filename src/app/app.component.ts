import { Component, OnInit } from '@angular/core';
import { DashboardData, DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  data: DashboardData | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    this.status = 'loading';
    this.data = null;
    try {
      this.data = await this.dataService.getDashboardData();
      this.status = 'success';
    } catch {
      this.status = 'error';
    }
  }
}