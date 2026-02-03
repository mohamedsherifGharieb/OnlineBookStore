import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  coverUrl: string;
  inStock: boolean;
  stockCount: number;
}

@Component({
  selector: 'app-store-my-books',
  standalone: true,
  imports: [CommonModule, FormsModule, Nav, Footer],
  templateUrl: './store-my-books.html',
  styleUrls: ['./store-my-books.css']
})
export class StoreMyBooksPage {
  searchQuery = signal('');
  showDropdown = signal<string | null>(null);

  books = signal<Book[]>([
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      category: 'Fiction',
      price: 16.99,
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      inStock: true,
      stockCount: 24,
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self-Help',
      price: 18.99,
      coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
      inStock: true,
      stockCount: 15,
    },
    {
      id: '3',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      category: 'Sci-Fi',
      price: 19.99,
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
      inStock: false,
      stockCount: 0,
    },
    {
      id: '4',
      title: 'The Song of Achilles',
      author: 'Madeline Miller',
      category: 'Historical Fiction',
      price: 15.49,
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      inStock: true,
      stockCount: 32,
    },
    {
      id: '5',
      title: 'Educated',
      author: 'Tara Westover',
      category: 'Memoir',
      price: 16.49,
      coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
      inStock: true,
      stockCount: 18,
    },
  ]);

  addNewBook(): void {
    console.log('Add new book');
    // Navigate to add book page
  }

  toggleDropdown(bookId: string): void {
    if (this.showDropdown() === bookId) {
      this.showDropdown.set(null);
    } else {
      this.showDropdown.set(bookId);
    }
  }

  editBook(bookId: string): void {
    console.log('Edit book:', bookId);
    this.showDropdown.set(null);
  }

  viewBookDetails(bookId: string): void {
    console.log('View details:', bookId);
    this.showDropdown.set(null);
  }

  deleteBook(bookId: string): void {
    console.log('Delete book:', bookId);
    this.showDropdown.set(null);
    if (confirm('Are you sure you want to delete this book?')) {
      this.books.update(books => books.filter(b => b.id !== bookId));
    }
  }

  filterByCategory(): void {
    console.log('Filter by category');
    // Show category filter dropdown
  }

  filterByStatus(): void {
    console.log('Filter by status');
    // Show status filter dropdown
  }
}
