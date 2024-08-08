// parent.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Person {
  name: string;
  email: string;
  phoneNumber: number;
  isDeleted: boolean;
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildComponent, ConfirmDialogComponent],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  people: Person[] = [];
  newPerson: Person = { name: '', email: '', phoneNumber: 0, isDeleted: false };
  editingPersonIndex: number | null = null;

  showDialog = false;
  dialogMessage = '';
  dialogAction: 'save' | 'delete' | null = null;
  tempDeleteIndex: number | null = null;

  savePerson() {
    this.showDialog = true;
    this.dialogMessage = 'Do you want to save this Details?';
    this.dialogAction = 'save';
  }

  editPerson(index: number) {
    this.newPerson = { ...this.people[index] };
    this.editingPersonIndex = index;
    this.people[index].isDeleted = false;
  }

  confirmDelete(index: number) {
    this.showDialog = true;
    this.dialogMessage = 'Are you sure you want to delete this detail?';
    this.dialogAction = 'delete';
    this.tempDeleteIndex = index;
  }

  handleConfirm(isConfirmed: boolean) {
    if (isConfirmed) {
      if (this.dialogAction === 'save') {
        this.performSave();
      } else if (
        this.dialogAction === 'delete' &&
        this.tempDeleteIndex !== null
      ) {
        this.performDelete(this.tempDeleteIndex);
      }
    }
    this.showDialog = false;
    this.dialogAction = null;
    this.tempDeleteIndex = null;
  }

  private performSave() {
    if (this.editingPersonIndex === null) {
      this.people.push({ ...this.newPerson, isDeleted: false });
    } else {
      this.people[this.editingPersonIndex] = {
        ...this.newPerson,
        isDeleted: false,
      };
      this.editingPersonIndex = null;
    }
    this.newPerson = { name: '', email: '', phoneNumber: 0, isDeleted: false };
    this.showSuccessMessage('Details saved successfully!');
  }

  private performDelete(index: number) {
    this.people[index].isDeleted = true;
    this.showSuccessMessage('Details deleted successfully!');
  }

  private showSuccessMessage(message: string) {
    this.showDialog = true;
    this.dialogMessage = message;
    this.dialogAction = null;
  }
}
