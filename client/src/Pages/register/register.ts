import { Component, signal, computed, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../Core/services/account-service';
import { RegisterCreds } from '../../Types/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage {
  
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>(); 
  protected creds ={} as RegisterCreds;

  showPassword = signal(false);
  showConfirmPassword = signal(false);
  role = signal<'buyer' | 'store'>('buyer');

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  setRole(newRole: 'buyer' | 'store'): void {
    this.role.set(newRole);
  }
  register()
{
  console.log(this.creds);

  this.accountService.register(this.creds).subscribe({
    next: reponse => {
      this.cancel();
    },
    error: error => console.log(error)
  });
}
cancel()
{
  console.log("cancelled!");
  this.cancelRegister.emit(false);
}
}
