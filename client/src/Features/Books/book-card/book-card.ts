import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BookCardModel {
  id: string;
  title: string;
  author?: string;
  image?: string;
  price?: number;
  category?: string;
  rating?: number; // 0-5
}

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.html',
  styleUrls: ['./book-card.css']
})
export class BookCard {
  _book = signal<BookCardModel | null>(null);

  // simple helper for rendering stars
  stars = [0, 1, 2, 3, 4];
  
  @Input() className: string | string[] | Record<string, boolean> = '';
  @Input() style: Record<string, any> | null = null;

  get title() { return this._book()?.title ?? ''; }
  get author() { return this._book()?.author ?? ''; }
  get coverUrl() { return this._book()?.image ?? null; }
  get store() { return (this._book()?.category) ?? ''; }
  get rating() { return this._book()?.rating ?? 0; }
  get price() { return this._book()?.price ?? null; }

  @Input()
  set book(v: BookCardModel | null) {
    this._book.set(v);
  }

  @Output() buy = new EventEmitter<string>();

  onBuy(event: Event) {
    event.stopPropagation();
    const b = this._book();
    if (b) this.buy.emit(b.id);
  }

  isStarFilled(index: number) {
    const r = Math.round(this._book()?.rating ?? 0);
    return index < r;
  }
}