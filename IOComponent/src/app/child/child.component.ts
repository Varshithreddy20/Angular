import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Person {
  name: string;
  email: string;
  phoneNumber: number;
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input() people: Person[] = [];
  @Output() editPerson = new EventEmitter<number>();

  edit(index: number) {
    this.editPerson.emit(index);
  }
}
