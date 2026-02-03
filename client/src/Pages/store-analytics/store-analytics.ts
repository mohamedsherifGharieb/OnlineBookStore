import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
}

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface TopBook {
  title: string;
  sales: number;
  revenue: number;
  trend: 'up' | 'down';
}

interface Activity {
  action: string;
  detail: string;
  time: string;
}

@Component({
  selector: 'app-store-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, Nav, Footer],
  templateUrl: './store-analytics.html',
  styleUrls: ['./store-analytics.css']
})
export class StoreAnalyticsPage {
  timeRange = signal('year');

  stats = signal<StatCard[]>([
    {
      title: 'Total Revenue',
      value: '$89,500',
      change: '+12.5%',
      trend: 'up',
      description: 'vs last period',
    },
    {
      title: 'Total Orders',
      value: '924',
      change: '+8.2%',
      trend: 'up',
      description: 'vs last period',
    },
    {
      title: 'New Customers',
      value: '156',
      change: '-3.1%',
      trend: 'down',
      description: 'vs last period',
    },
    {
      title: 'Books Sold',
      value: '1,847',
      change: '+15.3%',
      trend: 'up',
      description: 'vs last period',
    },
  ]);

  salesData = signal<SalesData[]>([
    { month: 'Jan', revenue: 4200, orders: 45 },
    { month: 'Feb', revenue: 5100, orders: 52 },
    { month: 'Mar', revenue: 4800, orders: 48 },
    { month: 'Apr', revenue: 6200, orders: 67 },
    { month: 'May', revenue: 7100, orders: 73 },
    { month: 'Jun', revenue: 6800, orders: 69 },
    { month: 'Jul', revenue: 7500, orders: 78 },
    { month: 'Aug', revenue: 8200, orders: 85 },
    { month: 'Sep', revenue: 7800, orders: 80 },
    { month: 'Oct', revenue: 9100, orders: 94 },
    { month: 'Nov', revenue: 10500, orders: 108 },
    { month: 'Dec', revenue: 12200, orders: 125 },
  ]);

  categoryData = signal<CategoryData[]>([
    { name: 'Fiction', value: 45, color: '#8B4513' },
    { name: 'Non-Fiction', value: 25, color: '#D2691E' },
    { name: 'Children', value: 15, color: '#F4A460' },
    { name: 'Academic', value: 10, color: '#DEB887' },
    { name: 'Comics', value: 5, color: '#FFDAB9' },
  ]);

  topBooks = signal<TopBook[]>([
    { title: 'The Great Gatsby', sales: 234, revenue: 3506.66, trend: 'up' },
    { title: '1984', sales: 198, revenue: 2572.02, trend: 'up' },
    { title: 'Pride and Prejudice', sales: 176, revenue: 2110.24, trend: 'down' },
    { title: 'To Kill a Mockingbird', sales: 156, revenue: 2182.44, trend: 'up' },
    { title: 'The Catcher in the Rye', sales: 142, revenue: 1560.58, trend: 'down' },
  ]);

  recentActivity = signal<Activity[]>([
    { action: 'New order', detail: 'Order #ORD-2024-156 placed', time: '2 min ago' },
    { action: 'Book sold', detail: 'The Great Gatsby × 2', time: '15 min ago' },
    { action: 'Review received', detail: '5-star review on 1984', time: '1 hour ago' },
    { action: 'New customer', detail: 'Sarah Wilson signed up', time: '3 hours ago' },
    { action: 'Restock alert', detail: 'Jane Eyre is running low', time: '5 hours ago' },
  ]);

  onTimeRangeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.timeRange.set(select.value);
    console.log('Time range changed to:', select.value);
    // Fetch new data based on time range
  }

  getStatIcon(title: string): string {
    switch (title) {
      case 'Total Revenue':
        return 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'Total Orders':
        return 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z';
      case 'New Customers':
        return 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z';
      case 'Books Sold':
        return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
      default:
        return '';
    }
  }
}
