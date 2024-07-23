import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() val!: string;
  @Output() taskDeleted = new EventEmitter<void>();

  onDeleteClick() {
    this.taskDeleted.emit();
  }
}
