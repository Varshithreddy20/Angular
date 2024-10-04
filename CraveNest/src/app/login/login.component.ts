import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService } from '../dialog.service'; // Import DialogService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null; // Error message state

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public authService: AuthService,
    private dialogService: DialogService
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogIn() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.loginError = null; // Reset error message

      this.loginService.login(formData).subscribe(
        (response) => {
          console.log('Login Successful:', response);

          // Log the response to debug missing signUpId, role, or name
          console.log('Response Data:', response);

          // Assign default values if signUpId or role is missing
          const signUpId =
            response.signUpId !== undefined ? response.signUpId : 0; // Default to 0 if undefined
          const role = response.role !== undefined ? response.role : 1; // Default to 1 if undefined
          const name =
            response.name !== undefined ? response.name : 'Unknown User'; // Default to 'Unknown User' if name is missing

          // Use AuthService to store token, email, name, signUpId, and role in sessionStorage
          this.authService.setSession(
            response.token,
            formData.emailId,
            name, // Pass the user's name
            signUpId,
            role
          );
          this.dialogService.openConfirmationDialog(
            'Login Successful',
            'Welcome to Crave Nest!'
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
          this.loginError =
            'Login failed. Please check your credentials and try again.';
        }
      );
    } else {
      this.loginError = 'Please fill in all required fields with valid data.'; // Error message for invalid form
      console.error('Form is invalid');
    }
  }

  // Navigate to admin page (example function for other navigation)
  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  // Navigate to signup page
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
