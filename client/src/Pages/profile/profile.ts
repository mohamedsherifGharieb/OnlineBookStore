import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav } from '../../Layout/nav/nav';
import { Footer } from '../../Sections/footer/footer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, Nav, Footer],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfilePage {
  displayName = signal('John Doe');
  email = signal('john@example.com');
  phone = signal('');
  address = signal('');
  city = signal('');
  state = signal('');
  zip = signal('');
  memberSince = signal('Jan 2025');
  isEditing = signal(false);

  changePhoto(): void {
    console.log('Change photo clicked');
    // Open file picker or photo upload modal
  }

  toggleEdit(): void {
    this.isEditing.set(!this.isEditing());
  }

  saveChanges(): void {
    console.log('Saving changes...', {
      displayName: this.displayName(),
      phone: this.phone(),
      address: this.address(),
      city: this.city(),
      state: this.state(),
      zip: this.zip()
    });
    // Save to backend
    this.isEditing.set(false);
  }
}
