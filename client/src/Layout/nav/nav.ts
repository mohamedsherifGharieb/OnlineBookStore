import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, BookOpen, ShoppingCart, Menu, X, Search } from 'lucide-angular';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  private router = inject(Router);

  readonly BookOpen = BookOpen;
  readonly ShoppingCart = ShoppingCart;
  readonly Menu = Menu;
  readonly X = X;
  readonly Search = Search;

  // State
  isMenuOpen = false;
  cartItemCount = 0; // TODO: Connect to cart service later

  // Navigation links
  navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Browse Books', href: '/browse' },
    { label: 'Stores', href: '/stores' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onSignUp(): void {
    this.router.navigate(['/register']);
  }

  onLogIn(): void {
    this.router.navigate(['/login']);
  }
}