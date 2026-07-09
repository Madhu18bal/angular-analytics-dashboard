import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getDashboardData(): Promise<DashboardData> {
    return firstValueFrom(
      this.http.get<DashboardData>('assets/mock-data.json')
    );
  }
}