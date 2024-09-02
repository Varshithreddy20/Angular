import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  SignUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.SignUpForm = this.fb.group({
      name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignUp() {
    if (this.SignUpForm.valid) {
      console.log(this.SignUpForm.value);
      this.router.navigate(['/home']);
    } else {
      console.log('Form is invalid');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
