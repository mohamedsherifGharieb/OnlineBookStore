import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

interface StoreData {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
  banner: string;
  rating: number;
  totalReviews: number;
  totalBooks: number;
  totalOrders: number;
  joinedDate: string;
  verified: boolean;
}

@Component({
  selector: 'app-store-info',
  standalone: true,
  imports: [CommonModule, FormsModule, Nav, Footer],
  templateUrl: './store-info.html',
  styleUrls: ['./store-info.css']
})
export class StoreInfoPage {
  isEditing = signal(false);

  storeData = signal<StoreData>({
    name: 'Classic Book Emporium',
    description: 'A curated collection of timeless literary works, spanning from ancient classics to modern masterpieces. We specialize in high-quality editions, rare finds, and beloved favorites for book lovers of all ages.',
    email: 'contact@classicbooks.com',
    phone: '+1 (555) 123-4567',
    address: '123 Literary Lane, Booktown, NY 10001',
    website: 'www.classicbookemporium.com',
    logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    banner: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200',
    rating: 4.8,
    totalReviews: 1247,
    totalBooks: 156,
    totalOrders: 3892,
    joinedDate: 'January 2022',
    verified: true,
  });

  formData = signal({
    name: this.storeData().name,
    description: this.storeData().description,
    email: this.storeData().email,
    phone: this.storeData().phone,
    address: this.storeData().address,
    website: this.storeData().website,
  });

  toggleEdit(): void {
    if (this.isEditing()) {
      // Reset form data if canceling
      this.formData.set({
        name: this.storeData().name,
        description: this.storeData().description,
        email: this.storeData().email,
        phone: this.storeData().phone,
        address: this.storeData().address,
        website: this.storeData().website,
      });
    }
    this.isEditing.set(!this.isEditing());
  }

  handleSave(): void {
    console.log('Saving store info:', this.formData());
    // Update store data with form data
    this.storeData.update(data => ({
      ...data,
      ...this.formData()
    }));
    this.isEditing.set(false);
    // Show success message (could use a toast service)
    alert('Store information has been saved successfully.');
  }

  previewStore(): void {
    console.log('Preview store');
    // Navigate to public store page
  }

  uploadLogo(): void {
    console.log('Upload logo');
    // Open file picker
  }

  uploadBanner(): void {
    console.log('Upload banner');
    // Open file picker
  }
}
