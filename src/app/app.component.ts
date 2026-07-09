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

<<<<<<< HEAD
  async load(): Promise<void> {
    this.status = 'loading';
    this.data = null;
    try {
      const result = await this.dataService.getDashboardData();
      this.data = result;
       this.status = 'success';
      this.appRef.tick();
      const spinner = document.querySelector('.state-message') as HTMLElement | null;
      if (spinner) {
        spinner.textContent = 'DIRECT-DOM-BYPASS-WORKED';
        spinner.style.background = 'yellow';
      }
    } catch {
      this.status = 'error';
      this.appRef.tick();
    }
cosole.log('data',this.data);
=======
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
>>>>>>> 5cf685a5084fe91ecbd30a5d4af788a8a6ff77c3
  }
}
