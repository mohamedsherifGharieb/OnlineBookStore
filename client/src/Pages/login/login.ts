import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage {
  showPassword = false;
  formData = {
    email: '',
    password: '',
    rememberMe: false,
  };

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Login submitted:', this.formData);
    // Mock login - navigate to home
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
