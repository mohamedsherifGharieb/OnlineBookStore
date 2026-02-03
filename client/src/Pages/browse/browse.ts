import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';
import { BookCard } from '../../Features/Books/book-card/book-card';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  store: string;
  coverUrl: string;
  category: string;
  publicationDate: string;
}

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [FormsModule, Nav, Footer, BookCard],
  templateUrl: './browse.html',
  styleUrls: ['./browse.css']
})
export class BrowsePage {
  searchQuery = signal('');
  viewMode = signal<'grid' | 'list'>('grid');
  sortBy = signal('featured');
  priceRange = signal<[number, number]>([0, 50]);
  selectedCategories = signal<string[]>([]);
  selectedRating = signal<number | null>(null);
  showMobileFilters = signal(false);

  categories = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Self-Help',
    'Biography',
    'History',
  ];

  ratings = [4, 3, 2, 1];

  // Mock books data
  books: Book[] = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 14.99,
      rating: 4.5,
      store: 'Cozy Corner Books',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      category: 'Fiction',
      publicationDate: '2020-09-29'
    },
    {
      id: '2',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 18.99,
      rating: 4.8,
      store: 'Stellar Reads',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      category: 'Science Fiction',
      publicationDate: '2021-05-04'
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 16.99,
      rating: 4.7,
      store: 'Mind & Matter',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      category: 'Self-Help',
      publicationDate: '2018-10-16'
    },
    {
      id: '4',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      price: 12.99,
      rating: 4.6,
      store: 'Classic Tales',
      coverUrl: 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=400&h=600&fit=crop',
      category: 'Fiction',
      publicationDate: '2017-06-13'
    },
    {
      id: '5',
      title: 'Dune',
      author: 'Frank Herbert',
      price: 15.99,
      rating: 4.7,
      store: 'Stellar Reads',
      coverUrl: 'https://images.unsplash.com/photo-1531072901881-d644216d4bf9?w=400&h=600&fit=crop',
      category: 'Science Fiction',
      publicationDate: '1965-08-01'
    },
    {
      id: '6',
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      price: 14.99,
      rating: 4.5,
      store: 'Fantasy Realm',
      coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
      category: 'Fantasy',
      publicationDate: '2007-03-27'
    },
    {
      id: '7',
      title: 'Gone Girl',
      author: 'Gillian Flynn',
      price: 11.99,
      rating: 4.3,
      store: 'Mystery Corner',
      coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop',
      category: 'Mystery',
      publicationDate: '2012-06-05'
    },
    {
      id: '8',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      price: 19.99,
      rating: 4.6,
      store: 'Knowledge Hub',
      coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      category: 'History',
      publicationDate: '2011-01-01'
    },
    {
      id: '9',
      title: 'Becoming',
      author: 'Michelle Obama',
      price: 17.99,
      rating: 4.8,
      store: 'Inspiration Books',
      coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
      category: 'Biography',
      publicationDate: '2018-11-13'
    }
  ];

  constructor(private router: Router) {}

  filteredBooks = computed(() => {
    let filtered = this.books.filter((book) => {
      // Search query
      if (this.searchQuery()) {
        const query = this.searchQuery().toLowerCase();
        if (
          !book.title.toLowerCase().includes(query) &&
          !book.author.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      // Price range
      const [min, max] = this.priceRange();
      if (book.price < min || book.price > max) {
        return false;
      }
      // Categories
      if (this.selectedCategories().length > 0 && !this.selectedCategories().includes(book.category)) {
        return false;
      }
      // Rating
      if (this.selectedRating() && book.rating < this.selectedRating()!) {
        return false;
      }
      return true;
    });

    // Sort
    return [...filtered].sort((a, b) => {
      switch (this.sortBy()) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
        default:
          return 0;
      }
    });
  });

  hasActiveFilters = computed(() => {
    return (
      this.searchQuery() ||
      this.priceRange()[0] > 0 ||
      this.priceRange()[1] < 50 ||
      this.selectedCategories().length > 0 ||
      this.selectedRating()
    );
  });

  toggleCategory(category: string): void {
    const current = this.selectedCategories();
    if (current.includes(category)) {
      this.selectedCategories.set(current.filter(c => c !== category));
    } else {
      this.selectedCategories.set([...current, category]);
    }
  }

  isCategorySelected(category: string): boolean {   
    return this.selectedCategories().includes(category);
  }

  setRating(rating: number): void {
    if (this.selectedRating() === rating) {
      this.selectedRating.set(null);
    } else {
      this.selectedRating.set(rating);
    }
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.priceRange.set([0, 50]);
    this.selectedCategories.set([]);
    this.selectedRating.set(null);
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }

  toggleMobileFilters(): void {
    this.showMobileFilters.update(v => !v);
  }

  onPriceMinChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    const [, max] = this.priceRange();
    this.priceRange.set([value, max]);
  }

  onPriceMaxChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    const [min] = this.priceRange();
    this.priceRange.set([min, value]);
  }

  navigateToBook(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }

  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
