import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

interface Order {
  id: string;
  date: string;
  items: string[];
  store: string;
  total: string;
  status: 'delivered' | 'shipped' | 'processing' | 'pending';
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersPage {
  orders = signal<Order[]>([
    {
      id: 'ORD-2026-001',
      date: '2026-01-15',
      items: ['The Midnight Library', 'Atomic Habits'],
      store: 'Cozy Corner Books',
      total: '$35.98',
      status: 'delivered',
    },
    {
      id: 'ORD-2026-002',
      date: '2026-01-10',
      items: ['Project Hail Mary'],
      store: 'Sci-Fi Sanctuary',
      total: '$19.99',
      status: 'shipped',
    },
    {
      id: 'ORD-2026-003',
      date: '2026-01-05',
      items: ['Educated', 'The Song of Achilles'],
      store: 'Classic Tales',
      total: '$31.98',
      status: 'processing',
    },
    {
      id: 'ORD-2025-089',
      date: '2025-12-28',
      items: ['Where the Crawdads Sing'],
      store: "Nature's Nook",
      total: '$15.99',
      status: 'delivered',
    },
  ]);

  constructor(private router: Router) {}

  totalOrders = computed(() => this.orders().length);
  
  deliveredCount = computed(() => 
    this.orders().filter(o => o.status === 'delivered').length
  );
  
  inProgressCount = computed(() => 
    this.orders().filter(o => o.status === 'shipped' || o.status === 'processing').length
  );

  getStatusClasses(status: string): string {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-orange-100 text-orange-700 border-orange-200';
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

  getItemCount(items: string[]): string {
    return items.length === 1 ? '1 item' : `${items.length} items`;
  }

  viewOrder(orderId: string): void {
    console.log('View order:', orderId);
    // Navigate to order detail page
  }

  trackOrder(orderId: string): void {
    console.log('Track order:', orderId);
    // Open tracking modal or page
  }

  browsBooks(): void {
    this.router.navigate(['/browse']);
  }
}
