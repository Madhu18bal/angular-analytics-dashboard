import { ApplicationRef, Component, OnInit } from '@angular/core';
import { DashboardData, DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  data: DashboardData | null = null;

  constructor(private dataService: DataService, private appRef: ApplicationRef) {}

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    this.status = 'loading';
    this.data = null;
    try {
      const result = await this.dataService.getDashboardData();
      this.data = result;
      this.status = 'success';
      document.title = 'RENDER-TICK-' + Date.now();
      this.appRef.tick();
    } catch {
      this.status = 'error';
      this.appRef.tick();
    }
  }
}