import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MonthlyPoint } from '../../services/data.service';

Chart.register(...registerables);

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  templateUrl: './sales-chart.component.html'
})
export class SalesChartComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) data: MonthlyPoint[] = [];
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  private render(): void {
    if (!this.canvasRef || !this.data.length) return;
    this.chart?.destroy();
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.data.map((d) => d.month),
        datasets: [
          {
            label: 'Sales ($)',
            data: this.data.map((d) => d.sales),
            borderColor: '#4a67ff',
            backgroundColor: '#4a67ff',
            tension: 0.3
          },
          {
            label: 'New Users',
            data: this.data.map((d) => d.users),
            borderColor: '#22b573',
            backgroundColor: '#22b573',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
