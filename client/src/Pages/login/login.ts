import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from '../../Types/user';
import { AccountService } from '../../Core/services/account-service';
import { ToastService } from '../../Core/services/toast-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage {
  
  private router = inject(Router);

   protected accountService = inject(AccountService);
   private toastService = inject(ToastService);
   protected creds: any = {}


  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  goBack() {
    this.router.navigate(['/']);
  }

 login() {
  if(!this.creds.email || !this.creds.password){
    this.toastService.warn("Please enter email and password");
    return;
  }
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.toastService.success("Logged in successfully");
        this.creds = {};
      },
      error: error => {
        this.toastService.error(error.error);
      }
    });
  }
  logout() {
    this.accountService.logout();
    this.toastService.info("Logged out");
  }
}
