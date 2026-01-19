import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  // Icons
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

  onSignIn(): void {
    // TODO: Implement sign in modal
    console.log('Sign In clicked');
  }

  onSignUp(): void {
    // TODO: Implement sign up modal
    console.log('Sign Up clicked');
  }
}