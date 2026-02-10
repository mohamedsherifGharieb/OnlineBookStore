import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';
import { OrderService } from '../../Core/services/order-service';
import { Order } from '../../Types/order';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersPage {
  orders = signal<Order[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  private ordersService = inject(OrderService);


  constructor(private router: Router) {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading.set(true);
    this.error.set(null);
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load orders.');
        this.loading.set(false);
      }
    });
  }


  totalOrders = computed(() => this.orders().length);
  deliveredCount = computed(() => this.orders().filter(o => o.status?.toLowerCase() === 'delivered').length);
  inProgressCount = computed(() => this.orders().filter(o => o.status?.toLowerCase() === 'shipped' || o.status?.toLowerCase() === 'processing').length);
  cancelledCount = computed(() => this.orders().filter(o => o.status?.toLowerCase() === 'cancelled').length);
  completedCount = computed(() => this.orders().filter(o => o.status?.toLowerCase() === 'delivered').length);


  getStatusClasses(status: string): string {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  }


  formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }


  getItemCount(items: any[]): string {
    return items.length === 1 ? '1 item' : `${items.length} items`;
  }

  getItemTitles(items: any[]): string {
    if (!items || items.length === 0) return '';
    return items.map((i: any) => i.eBookTitle).join(', ');
  }


  viewOrder(orderId: string): void {
    console.log('View order:', orderId);
    // Navigate to order detail page
  }


  trackOrder(orderId: string): void {
    console.log('Track order:', orderId);
    // Open tracking modal or page
  }

  cancelOrder(orderId: string): void {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    this.ordersService.cancelOrder(orderId).subscribe({
      next: () => {
        this.fetchOrders();
      },
      error: (err) => {
        this.error.set('Failed to cancel order.');
      }
    });
  }

  browsBooks(): void {
    this.router.navigate(['/browse']);
  }
}
