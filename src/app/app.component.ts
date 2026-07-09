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
    this.status = 'success';
    this.data = null;

console.log('Null?',this.data);
    try {
      const result = await this.dataService.getDashboardData();
      this.data = result;
console.log(this.data);
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
  }
}