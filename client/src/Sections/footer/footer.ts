import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Link {
  label: string;
  href: string;
}

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  email = '';
  currentYear = new Date().getFullYear();

  quickLinks: Link[] = [
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Terms & Conditions', href: '#terms' },
    { label: 'Privacy Policy', href: '#privacy' },
  ];

  customerService: Link[] = [
    { label: 'Help Center', href: '#help' },
    { label: 'Shipping Info', href: '#shipping' },
    { label: 'Returns', href: '#returns' },
    { label: 'Track Order', href: '#track' },
  ];

  socialLinks: SocialLink[] = [
    { icon: 'facebook', href: '#', label: 'Facebook' },
    { icon: 'twitter', href: '#', label: 'Twitter' },
    { icon: 'instagram', href: '#', label: 'Instagram' },
    { icon: 'linkedin', href: '#', label: 'LinkedIn' },
  ];

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Newsletter signup:', this.email);
    this.email = '';
  }
}
