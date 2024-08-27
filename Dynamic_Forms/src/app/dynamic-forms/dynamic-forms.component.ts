import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
})
export class DynamicFormsComponent implements OnInit {
  emailControl?: FormControl;
  buyTicketForm: FormGroup;
  defaultLogin = {
    email: 'debugmode@outlook.com',
    password: '282828282',
  };

  constructor(private fb: FormBuilder) {
    this.buyTicketForm = this.fb.group({
      emailControl: [null, [Validators.required]],
      phoneControl: [null],
      address: this.fb.group({
        streetControl: [],
        postalcodeControl: [],
      }),
      tickets: this.fb.array([this.createTicket()], Validators.required),
    });
  }

  ngOnInit() {
    this.emailControl = new FormControl(
      this.defaultLogin.email,
      Validators.required
    );
  }

  createTicket(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
    });
  }

  get tickets(): FormArray {
    return this.buyTicketForm.get('tickets') as FormArray;
  }

  addTicket() {
    this.tickets.push(this.createTicket());
  }

  buyTickets() {
    if (this.buyTicketForm.valid) {
      console.log(this.buyTicketForm.value);
    }
  }
}
