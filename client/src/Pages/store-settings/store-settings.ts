import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NotificationSettings {
  newOrders: boolean;
  orderUpdates: boolean;
  lowStock: boolean;
  reviews: boolean;
  marketing: boolean;
}

interface ShippingSettings {
  freeShippingThreshold: string;
  standardRate: string;
  expressRate: string;
  processingDays: string;
}

@Component({
  selector: 'app-store-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store-settings.html',
  styleUrls: ['./store-settings.css']
})
export class StoreSettingsPage {
  activeTab = signal('notifications');
  showDeleteDialog = signal(false);

  notificationItems: Array<{key: keyof NotificationSettings; label: string; desc: string}> = [
    {key: 'newOrders', label: 'New Orders', desc: 'Get notified when a customer places a new order'},
    {key: 'orderUpdates', label: 'Order Updates', desc: 'Receive updates on shipping and delivery status'},
    {key: 'lowStock', label: 'Low Stock Alerts', desc: 'Get alerted when inventory runs low'},
    {key: 'reviews', label: 'Customer Reviews', desc: 'Be notified when customers leave reviews'},
    {key: 'marketing', label: 'Marketing Emails', desc: 'Receive tips and promotional content'}
  ];

  notifications = signal<NotificationSettings>({
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    reviews: false,
    marketing: false,
  });

  shipping = signal<ShippingSettings>({
    freeShippingThreshold: '50',
    standardRate: '5.99',
    expressRate: '12.99',
    processingDays: '2',
  });

  payoutEmail = signal('store@classicbooks.com');
  payoutSchedule = signal('weekly');
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  toggleNotification(key: keyof NotificationSettings): void {
    this.notifications.update(n => ({
      ...n,
      [key]: !n[key]
    }));
  }

  saveNotifications(): void {
    console.log('Saving notifications:', this.notifications());
    alert('Notification settings have been updated successfully.');
  }

  saveShipping(): void {
    console.log('Saving shipping:', this.shipping());
    alert('Shipping settings have been updated successfully.');
  }

  savePayment(): void {
    console.log('Saving payment settings');
    alert('Payment settings have been updated successfully.');
  }

  updatePassword(): void {
    if (!this.currentPassword() || !this.newPassword() || !this.confirmPassword()) {
      alert('Please fill in all password fields.');
      return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
      alert('New passwords do not match.');
      return;
    }
    console.log('Updating password');
    alert('Security settings have been updated successfully.');
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
  }

  enableTwoFactor(): void {
    console.log('Enabling two-factor authentication');
    alert('Two-factor authentication setup initiated.');
  }

  pauseStore(): void {
    console.log('Pausing store');
    alert('Your store has been paused.');
  }

  openDeleteDialog(): void {
    this.showDeleteDialog.set(true);
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog.set(false);
  }

  deleteStore(): void {
    console.log('Deleting store');
    alert('Store deletion initiated. This is a permanent action.');
    this.closeDeleteDialog();
  }
}
