import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

interface CartItem {
  id: string;
  title: string;
  author: string;
  store: string;
  price: number;
  quantity: number;
  coverUrl: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartPage {
  items = signal<CartItem[]>([
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      store: 'Cozy Corner Books',
      price: 16.99,
      quantity: 1,
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      store: 'Cozy Corner Books',
      price: 18.99,
      quantity: 2,
      coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400'
    }
  ]);

  constructor(private router: Router) {}

  subtotal = computed(() => 
    this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  totalItems = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  shipping = computed(() => this.subtotal() >= 35 ? 0 : 4.99);

  tax = computed(() => this.subtotal() * 0.08);

  total = computed(() => this.subtotal() + this.shipping() + this.tax());

  freeShippingRemaining = computed(() => {
    const remaining = 35 - this.subtotal();
    return remaining > 0 ? remaining : 0;
  });

  updateQuantity(itemId: string, newQuantity: number): void {
    if (newQuantity < 1) return;
    
    this.items.update(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  removeItem(itemId: string): void {
    this.items.update(items => items.filter(item => item.id !== itemId));
  }

  clearCart(): void {
    this.items.set([]);
  }

  navigateToBook(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }

  browsebooks(): void {
    this.router.navigate(['/browse']);
  }

  checkout(): void {
    console.log('Proceeding to checkout...');
    // Navigate to checkout page
  }
}
