import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, BookOpen, ShoppingCart, Menu, X, Search } from 'lucide-angular';
import { AccountService } from '../../Core/services/account-service';
import { ToastService } from '../../Core/services/toast-service';

interface NavLink {
  label: string;
  href?: string;
  scrollTo?: string;
}

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  private router = inject(Router);
  accountService = inject(AccountService);
  private toastService = inject(ToastService);

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
    { label: 'Home', scrollTo: 'hero' },
    { label: 'Browse Books', href: '/browse' },
    { label: 'About Us', scrollTo: 'about' },
    { label: 'Contact', scrollTo: 'contact' }
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

  scrollToSection(id: string): void {
    // If not on the home page, navigate there first then scroll
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.smoothScroll(id), 100);
      });
    } else {
      this.smoothScroll(id);
    }
  }

  private smoothScroll(id: string): void {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  logout(): void {
    this.accountService.logout();
    this.toastService.info('Logged out');
    this.router.navigate(['/']);
  }
}