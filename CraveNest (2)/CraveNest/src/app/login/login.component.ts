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
    public authService: AuthService
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

          // Log the response to debug missing signUpId or role
          console.log('Response Data:', response);

          // Assign default values if signUpId or role is missing
          const signUpId =
            response.signUpId !== undefined ? response.signUpId : 0; // default to 0 if undefined
          const role = response.role !== undefined ? response.role : 1; // default to 1 if undefined

          // Use AuthService to store token, email, and role in sessionStorage
          this.authService.setSession(
            response.token,
            formData.emailId,
            signUpId,
            role
          );

          // Redirect user based on role
          if (role === 2) {
            this.router.navigate(['/admin']); // Admin page for role 2
          } else {
            this.router.navigate(['/home']); // Home page for role 1 (normal user)
          }
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
