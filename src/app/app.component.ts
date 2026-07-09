import { ApplicationRef, Component, OnInit } from '@angular/core';
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
  console.log("Load started");

  this.status = "loading";

  try {
    const result = await this.dataService.getDashboardData();

    console.log("Data received", result);

    this.data = result;

    this.status = "success";

    console.log("Status changed to", this.status);

  } catch (e) {
    console.error("Error:", e);
    this.status = "error";
  }
}
}