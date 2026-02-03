import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface Order {
  id: string;
  customer: string;
  book: string;
  date: string;
  amount: string;
  status: 'completed' | 'processing' | 'shipped' | 'pending';
}

@Component({
  selector: 'app-store-dashboard',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './store-dashboard.html',
  styleUrls: ['./store-dashboard.css']
})
export class StoreDashboardPage {
  showDropdown = signal<string | null>(null);

  stats = signal<StatCard[]>([
    {
      title: 'Total Revenue',
      value: '$12,543.00',
      change: '+12.5%',
      trend: 'up',
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+8.2%',
      trend: 'up',
    },
    {
      title: 'Books Listed',
      value: '48',
      change: '+3',
      trend: 'up',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.4%',
      trend: 'up',
    },
  ]);

  recentOrders = signal<Order[]>([
    {
      id: 'ORD-001',
      customer: 'Sarah Johnson',
      book: 'The Midnight Library',
      date: '2026-01-19',
      amount: '$16.99',
      status: 'completed',
    },
    {
      id: 'ORD-002',
      customer: 'Michael Chen',
      book: 'Atomic Habits',
      date: '2026-01-18',
      amount: '$18.99',
      status: 'processing',
    },
    {
      id: 'ORD-003',
      customer: 'Emily Brown',
      book: 'Project Hail Mary',
      date: '2026-01-18',
      amount: '$19.99',
      status: 'completed',
    },
    {
      id: 'ORD-004',
      customer: 'David Wilson',
      book: 'The Song of Achilles',
      date: '2026-01-17',
      amount: '$15.49',
      status: 'shipped',
    },
    {
      id: 'ORD-005',
      customer: 'Lisa Anderson',
      book: 'Educated',
      date: '2026-01-17',
      amount: '$16.49',
      status: 'pending',
    },
  ]);

  constructor(private router: Router) {}

  getStatIcon(title: string): string {
    switch (title) {
      case 'Total Revenue':
        return 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'Total Orders':
        return 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4';
      case 'Books Listed':
        return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
      case 'Conversion Rate':
        return 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6';
      default:
        return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  addNewBook(): void {
    console.log('Add new book');
    // Navigate to add book page
  }

  viewStore(): void {
    console.log('View store');
    // Navigate to public store page
  }

  viewAllOrders(): void {
    this.router.navigate(['/orders']);
  }

  toggleDropdown(orderId: string): void {
    if (this.showDropdown() === orderId) {
      this.showDropdown.set(null);
    } else {
      this.showDropdown.set(orderId);
    }
  }

  viewOrderDetails(orderId: string): void {
    console.log('View details:', orderId);
    this.showDropdown.set(null);
  }

  updateStatus(orderId: string): void {
    console.log('Update status:', orderId);
    this.showDropdown.set(null);
  }

  contactCustomer(orderId: string): void {
    console.log('Contact customer:', orderId);
    this.showDropdown.set(null);
  }
}
