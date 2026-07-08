import { Injectable } from '@angular/core';

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
  async getDashboardData(): Promise<DashboardData> {
    const res = await fetch('assets/mock-data.json');
    if (!res.ok) {
      throw new Error(`Failed to load dashboard data: ${res.status}`);
    }
    return res.json();
  }
}