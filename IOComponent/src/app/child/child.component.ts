// child.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Person {
  name: string;
  email: string;
  phoneNumber: number;
  isDeleted: boolean;
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input() people: Person[] = [];
  @Output() editPerson = new EventEmitter<number>();
  @Output() deleteConfirmation = new EventEmitter<number>();

  showDialog = false;
  dialogMessage = '';
  currentIndexToDelete: number | null = null;

  edit(index: number) {
    this.editPerson.emit(index);
  }

  confirmDelete(index: number) {
    this.currentIndexToDelete = index;
    this.showDialog = true;
    this.dialogMessage = 'Are you sure you want to delete this item?';
  }

  handleConfirm(isConfirmed: boolean) {
    if (isConfirmed && this.currentIndexToDelete !== null) {
      this.deleteConfirmation.emit(this.currentIndexToDelete);
    }
    this.showDialog = false;
    this.currentIndexToDelete = null;
  }

  isDeleted(index: number): boolean {
    return this.people[index].isDeleted;
  }
}
