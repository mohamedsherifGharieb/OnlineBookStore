import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Nav } from '../../../Layout/nav/nav';
import { Footer } from '../../../Sections/footer/footer';
import { BookCard } from '../book-card/book-card';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  store: string;
  coverUrl: string;
  category: string;
  description: string;
  isbn: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  language: string;
  inStock: boolean;
  stockCount: number;
  isSale?: boolean;
  isNew?: boolean;
}

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [FormsModule, Nav, Footer, BookCard],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  quantity = signal(1);
  isWishlisted = signal(false);
  activeTab = signal<'description' | 'details' | 'reviews' | 'store'>('description');
  book = signal<Book | null>(null);
  relatedBooks = signal<Book[]>([]);

  // Mock book data - in real app, this would come from a service
  private mockBooks: Book[] = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 14.99,
      originalPrice: 24.99,
      rating: 4.5,
      reviewCount: 2847,
      store: 'Cozy Corner Books',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      category: 'Fiction',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
      isbn: '978-0525559474',
      publisher: 'Viking Press',
      publicationDate: '2020-09-29',
      pages: 304,
      language: 'English',
      inStock: true,
      stockCount: 23,
      isSale: true
    },
    {
      id: '2',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 18.99,
      rating: 4.8,
      reviewCount: 5621,
      store: 'Stellar Reads',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      category: 'Science Fiction',
      description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name, let alone the nature of his assignment or how to complete it.',
      isbn: '978-0593135204',
      publisher: 'Ballantine Books',
      publicationDate: '2021-05-04',
      pages: 496,
      language: 'English',
      inStock: true,
      stockCount: 15,
      isNew: true
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 16.99,
      rating: 4.7,
      reviewCount: 8923,
      store: 'Mind & Matter',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      category: 'Self-Help',
      description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
      isbn: '978-0735211292',
      publisher: 'Avery',
      publicationDate: '2018-10-16',
      pages: 320,
      language: 'English',
      inStock: true,
      stockCount: 42
    },
    {
      id: '4',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      price: 12.99,
      originalPrice: 17.99,
      rating: 4.6,
      reviewCount: 4521,
      store: 'Classic Tales',
      coverUrl: 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=400&h=600&fit=crop',
      category: 'Historical Fiction',
      description: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.',
      isbn: '978-1501161933',
      publisher: 'Washington Square Press',
      publicationDate: '2017-06-13',
      pages: 400,
      language: 'English',
      inStock: false,
      stockCount: 0,
      isSale: true
    }
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const foundBook = this.mockBooks.find(b => b.id === id);
    this.book.set(foundBook || null);
    
    // Get related books (excluding current book)
    const related = this.mockBooks.filter(b => b.id !== id).slice(0, 4);
    this.relatedBooks.set(related);
  }

  goBack(): void {
    this.router.navigate(['/browse']);
  }

  setTab(tab: 'description' | 'details' | 'reviews' | 'store'): void {
    this.activeTab.set(tab);
  }

  incrementQuantity(): void {
    const book = this.book();
    if (book && this.quantity() < book.stockCount) {
      this.quantity.update(q => q + 1);
    }
  }

  decrementQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  toggleWishlist(): void {
    this.isWishlisted.update(v => !v);
  }

  addToCart(): void {
    const book = this.book();
    if (book) {
      console.log(`Added ${this.quantity()} × ${book.title} to cart`);
      // In real app, this would call a cart service
      alert(`Added ${this.quantity()} × ${book.title} to your cart!`);
    }
  }

  isStarFilled(star: number): boolean {
    const book = this.book();
    return book ? star <= Math.floor(book.rating) : false;
  }

  isStarHalf(star: number): boolean {
    const book = this.book();
    if (!book) return false;
    return star > Math.floor(book.rating) && star - 0.5 <= book.rating;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getSavings(): number {
    const book = this.book();
    if (book?.originalPrice) {
      return book.originalPrice - book.price;
    }
    return 0;
  }
}
