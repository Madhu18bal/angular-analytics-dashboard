import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, catchError, throwError } from 'rxjs';

export interface Summary {
  totalSales: number;
  totalUsers: number;
  totalTraffic: number;
  conversionRate: number;
}

export interface MonthlyPoint {
  month: string;
  sales: number;
  users: number;
}

export interface Transaction {
  id: number;
  customer: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface DashboardData {
  summary: Summary;
  monthlySales: MonthlyPoint[];
  transactions: Transaction[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  // Swap this URL for a public dummy API (e.g. JSONPlaceholder) or a real
  // backend endpoint when moving beyond mock data.
  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>('assets/mock-data.json').pipe(
      delay(600), // simulate network latency so loading state is visible
      catchError((err) => throwError(() => new Error('Failed to load dashboard data')))
    );
  }
}
