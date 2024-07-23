import { Component } from '@angular/core';
import { TodoListComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent],
  template: '<app-todo-list></app-todo-list>',
})
export class AppComponent {}
