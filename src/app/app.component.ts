import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardData, DataService } from './services/data.service';

type ViewState = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  data: DashboardData | null = null;
  state: ViewState = 'loading';

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.state = 'loading';
    console.log('[dashboard] fetching data...');
    this.dataService.getDashboardData().subscribe({
      next: (res) => {
        console.log('[dashboard] data received', res);
        this.data = res;
        this.state = 'success';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[dashboard] error loading data', err);
        this.state = 'error';
        this.cdr.detectChanges();
      }
    });
  }
}