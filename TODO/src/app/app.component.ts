import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  template: '<app-todo></app-todo>',
})
export class AppComponent {
  [x: string]: any;
}
