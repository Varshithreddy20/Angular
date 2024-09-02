import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {
  validateAddress,
  validateName,
} from '../confirm-dialog/custom_validators/custom_validators';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
})
export class DetailsComponent {
  form: FormGroup;
  submittedData: any[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      name: ['', [Validators.required, validateName]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, validateAddress]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      technologies: this.fb.array([this.createTechnologyControl()]),
    });
  }

  get technologies(): FormArray {
    return this.form.get('technologies') as FormArray;
  }

  createTechnologyControl(): FormGroup {
    return this.fb.group({
      technology: ['', Validators.required],
    });
  }

  addTechnology() {
    this.technologies.push(this.createTechnologyControl());
  }

  removeTechnology(index: number) {
    this.technologies.removeAt(index);
  }

  openConfirmDialog(message: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { message },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.editIndex !== null) {
        this.submittedData[this.editIndex] = this.form.value;
        this.openConfirmDialog('Successfully edited the details.');
        this.editIndex = null;
      } else {
        this.submittedData.push(this.form.value);
        this.openConfirmDialog('Successfully submitted the details.');
      }

      this.form.reset();
      this.technologies.clear();
      this.technologies.push(this.createTechnologyControl());
    }
  }

  onEdit(index: number) {
    const data = this.submittedData[index];
    this.form.patchValue(data);

    this.technologies.clear();
    data.technologies.forEach((tech: any) => {
      this.technologies.push(this.fb.group({ technology: tech.technology }));
    });

    this.editIndex = index;
  }

  onDelete(index: number) {
    this.submittedData.splice(index, 1);
    this.openConfirmDialog('Successfully deleted the details.');
  }
}
