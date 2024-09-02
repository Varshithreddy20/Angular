import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsyncValidationService } from '../async-validation.service';
import { of } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asyncValidationService: AsyncValidationService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, this.customUsernameValidator()]],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.asyncEmailValidator()],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  customUsernameValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      const hasNumber = /\d/.test(value);
      return hasNumber ? null : { usernameInvalid: true };
    };
  }

  asyncEmailValidator() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
        switchMap((value) => this.asyncValidationService.isEmailTaken(value)),
        map((isTaken) => (isTaken ? { emailTaken: true } : null))
      );
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted:', this.signupForm.value);
    } else {
      console.log('Form Invalid');
    }
  }
}
