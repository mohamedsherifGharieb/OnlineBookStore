import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage {
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  role = signal<'buyer' | 'store'>('buyer');

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };

  constructor(private router: Router) {}

  passwordStrength = computed(() => {
    const password = this.formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return { strength, label: labels[strength], color: colors[strength] };
  });

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  setRole(newRole: 'buyer' | 'store'): void {
    this.role.set(newRole);
  }

  isStrengthLevel(level: number): boolean {
    return level <= this.passwordStrength().strength;
  }

  onSubmit(): void {
    console.log('Register submitted:', { ...this.formData, role: this.role() });
    // Mock registration - navigate based on role
    if (this.role() === 'store') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/profile']);
    }
  }
}
