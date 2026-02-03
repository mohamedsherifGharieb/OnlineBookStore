import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
}

interface StatusConfig {
  label: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-store-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, Nav, Footer],
  templateUrl: './store-orders.html',
  styleUrls: ['./store-orders.css']
})
export class StoreOrdersPage {
  searchQuery = signal('');
  statusFilter = signal<string>('all');
  selectedOrder = signal<Order | null>(null);

  orders = signal<Order[]>([
    {
      id: 'ORD-2024-001',
      customer: 'John Smith',
      email: 'john@example.com',
      items: [
        { title: 'The Great Gatsby', quantity: 1, price: 14.99 },
        { title: '1984', quantity: 2, price: 12.99 },
      ],
      total: 40.97,
      status: 'pending',
      date: '2024-01-15',
      address: '123 Main St, New York, NY 10001',
    },
    {
      id: 'ORD-2024-002',
      customer: 'Emily Johnson',
      email: 'emily@example.com',
      items: [
        { title: 'Pride and Prejudice', quantity: 1, price: 11.99 },
      ],
      total: 11.99,
      status: 'processing',
      date: '2024-01-14',
      address: '456 Oak Ave, Los Angeles, CA 90001',
    },
    {
      id: 'ORD-2024-003',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      items: [
        { title: 'To Kill a Mockingbird', quantity: 1, price: 13.99 },
        { title: 'The Catcher in the Rye', quantity: 1, price: 10.99 },
      ],
      total: 24.98,
      status: 'shipped',
      date: '2024-01-13',
      address: '789 Pine Rd, Chicago, IL 60601',
    },
    {
      id: 'ORD-2024-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      items: [
        { title: 'Jane Eyre', quantity: 1, price: 12.99 },
      ],
      total: 12.99,
      status: 'delivered',
      date: '2024-01-10',
      address: '321 Elm St, Houston, TX 77001',
    },
    {
      id: 'ORD-2024-005',
      customer: 'David Lee',
      email: 'david@example.com',
      items: [
        { title: 'Wuthering Heights', quantity: 1, price: 11.99 },
      ],
      total: 11.99,
      status: 'cancelled',
      date: '2024-01-09',
      address: '654 Maple Dr, Phoenix, AZ 85001',
    },
  ]);

  statusConfig: Record<string, StatusConfig> = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
  };

  filteredOrders = computed(() => {
    const search = this.searchQuery().toLowerCase();
    const status = this.statusFilter();
    
    return this.orders().filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search);
      const matchesStatus = status === 'all' || order.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  orderStats = computed(() => ({
    pending: this.orders().filter(o => o.status === 'pending').length,
    processing: this.orders().filter(o => o.status === 'processing').length,
    shipped: this.orders().filter(o => o.status === 'shipped').length,
    delivered: this.orders().filter(o => o.status === 'delivered').length,
  }));

  setStatusFilter(status: string): void {
    this.statusFilter.set(status);
  }

  viewOrder(order: Order): void {
    this.selectedOrder.set(order);
  }

  closeModal(): void {
    this.selectedOrder.set(null);
  }

  processOrder(): void {
    console.log('Processing order:', this.selectedOrder()?.id);
    this.closeModal();
  }

  cancelOrder(): void {
    console.log('Cancelling order:', this.selectedOrder()?.id);
    this.closeModal();
  }

  markAsShipped(): void {
    console.log('Marking as shipped:', this.selectedOrder()?.id);
    this.closeModal();
  }
}
