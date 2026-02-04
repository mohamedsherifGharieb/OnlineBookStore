import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from '../../Types/user';
import { AccountService } from '../../Core/services/account-service';

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
    alert("Please enter email and password"); // Change it with Toast for better Ui
    return;
  }
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
        this.creds = {};
      },
      error: error => console.log(error)
    }
    )
   console.log(this.creds); 
   this.router.navigate(['/']);
  }
  logout() {
    this.accountService.logout();
  }
}
