import { Component, signal, inject, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../Core/services/account-service';
import { RegisterCreds } from '../../Types/user';
import { ToastService } from '../../Core/services/toast-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage {
  
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);
  
  cancelRegister = output<boolean>(); 
  protected registerForm: FormGroup;
  protected validationErrors = signal<string[]>([]);

  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      role: [1, Validators.required]
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  register() {
    if (this.registerForm.valid) {
      const creds: RegisterCreds = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        displayName: this.registerForm.value.displayName,
        role: this.registerForm.value.role
      };
      
      this.accountService.register(creds).subscribe({
        next: () => {
          this.toastService.success("Registered successfully, you are now logged in");
          this.router.navigateByUrl('/');
        },
        error: error => {
          this.toastService.error(error.error || 'Registration failed');
          this.validationErrors.set(error);
        }
      });
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true }
    }
  }

  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  passwordsMatch(): boolean {
    const confirmPassword = this.registerForm.get('confirmPassword');
    return !!(confirmPassword?.valid && confirmPassword?.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
