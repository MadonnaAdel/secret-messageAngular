import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  toastMessage: string = '';  


  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const body = this.resetPasswordForm.value;
      const { username, newPassword } = body;

      this.loginService.resetToken(username).pipe(
        switchMap((response) => {
          if (response && response.token) {
            body.token = response.token;
            return this.loginService.resetPasswprd(body);
          } else {
            throw new Error('Token not found');
          }
        })
      ).subscribe({
        next: (res) => {
          console.log('Response from resetPasswprd:', res);
          this.showToast("  reset password successfully");
          this.router.navigate(['/myMessages']);

        },
        error: (error) => {
          console.error('Error:', error);
          this.showToast("  sorry ,some thing wrong");
        }
      });
    }
  }

   showToast(toastMessage: string): void {
    const toastElement = document.getElementById("creatToast");
    this.toastMessage = toastMessage;
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }

}
