import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { SignupModule } from './signup.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  SignUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService
  ) {
    this.SignUpForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignUp() {
    if (this.SignUpForm.valid) {
      this.signupService.signUp(this.SignUpForm.value).subscribe(
        (response) => {
          console.log('Signup Successful:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup Failed:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
