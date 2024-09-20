import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogIn() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.loginService.login(formData).subscribe(
        (response) => {
          console.log('Login Successful:', response);

          // Use AuthService to store token and email in sessionStorage
          this.authService.setSession(response.token, formData.emailId);

          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login Failed:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
