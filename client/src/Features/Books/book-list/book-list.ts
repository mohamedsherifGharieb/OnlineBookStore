import { Component } from '@angular/core';
import { BookCard, BookCardModel } from '../book-card/book-card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookList {
  featuredBooks: BookCardModel[] = [
    { id: '1', title: 'The Midnight Library', author: 'Matt Haig', price: 16.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', category: 'Cozy Corner Books', rating: 4.5 },
    { id: '2', title: 'Atomic Habits', author: 'James Clear', price: 18.99, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', category: 'Mind & Matter', rating: 4.8 },
    { id: '3', title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', price: 14.99, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop', category: 'Literary Haven', rating: 4.6 },
    { id: '4', title: 'Project Hail Mary', author: 'Andy Weir', price: 19.99, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop', category: 'Sci-Fi Sanctuary', rating: 4.9 },
    { id: '5', title: "Where the Crawdads Sing", author: 'Delia Owens', price: 15.99, image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop', category: "Nature's Nook", rating: 4.4 },
    { id: '6', title: 'The House in the Cerulean Sea', author: 'TJ Klune', price: 17.99, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop', category: 'Fantasy Finds', rating: 4.7 },
    { id: '7', title: 'Educated', author: 'Tara Westover', price: 16.49, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop', category: 'Story & Spirit', rating: 4.5 },
    { id: '8', title: 'The Song of Achilles', author: 'Madeline Miller', price: 15.49, image: 'https://images.unsplash.com/photo-1509266272358-7701da638078?w=300&h=400&fit=crop', category: 'Classic Tales', rating: 4.6 },
  ];

  onBuy(bookId: string) {
    console.log('Buy clicked for', bookId);
  }
}
