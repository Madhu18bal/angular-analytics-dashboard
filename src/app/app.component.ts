import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DashboardData, DataService } from './services/data.service';

interface ViewModel {
  status: 'loading' | 'success' | 'error';
  data: DashboardData | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  vm$: Observable<ViewModel>;

  constructor(private dataService: DataService) {
    this.vm$ = this.buildStream();
  }

  retry(): void {
    this.vm$ = this.buildStream();
  }

  private buildStream(): Observable<ViewModel> {
    return this.dataService.getDashboardData().pipe(
      map((data) => ({ status: 'success' as const, data })),
      catchError(() => [{ status: 'error' as const, data: null }]),
      startWith({ status: 'loading' as const, data: null })
    );
  }
}