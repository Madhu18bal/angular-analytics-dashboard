import { Component, OnInit } from '@angular/core';
import { DashboardData, DataService } from './services/data.service';

type ViewState = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  data: DashboardData | null = null;
  state: ViewState = 'loading';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.state = 'loading';
    this.dataService.getDashboardData().subscribe({
      next: (res) => {
        this.data = res;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
}
