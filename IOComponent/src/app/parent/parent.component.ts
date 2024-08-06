import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from '../child/child.component';

interface Person {
  name: string;
  email: string;
  phoneNumber: number;
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildComponent],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  people: Person[] = [];
  newPerson: Person = { name: '', email: '', phoneNumber: 0 };
  editingPersonIndex: number | null = null;

  savePerson() {
    if (this.editingPersonIndex === null) {
      this.people.push({ ...this.newPerson });
    } else {
      this.people[this.editingPersonIndex] = { ...this.newPerson };
      this.editingPersonIndex = null;
    }
    this.newPerson = { name: '', email: '', phoneNumber: 0 };
  }

  editPerson(index: number) {
    this.newPerson = { ...this.people[index] };
    this.editingPersonIndex = index;
  }
}
