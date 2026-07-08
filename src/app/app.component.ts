import { Component, NgZone, OnInit } from '@angular/core';
import { DashboardData, DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  data: DashboardData | null = null;

  constructor(private dataService: DataService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    this.status = 'loading';
    this.data = null;
    try {
      const result = await this.dataService.getDashboardData();
      document.title = 'DATA-OK-' + Date.now();
      this.ngZone.run(() => {
        this.data = result;
        this.status = 'success';
      });
    } catch (err) {
      document.title = 'DATA-ERR-' + Date.now();
      this.ngZone.run(() => {
        this.status = 'error';
      });
    }
  }
}