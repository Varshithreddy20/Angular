import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { id: 0, name: '', description: '' };
  editingTodo: Todo | null = null;

  ngOnInit() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  addTodo() {
    if (this.newTodo.name && this.newTodo.description) {
      this.newTodo.id = Date.now();
      this.todos.push({ ...this.newTodo });
      this.newTodo = { id: 0, name: '', description: '' };
      this.updateLocalStorage();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateLocalStorage();
  }

  startEdit(todo: Todo) {
    this.editingTodo = { ...todo };
  }

  saveEdit() {
    if (this.editingTodo) {
      const index = this.todos.findIndex((t) => t.id === this.editingTodo!.id);
      if (index !== -1) {
        this.todos[index] = { ...this.editingTodo };
        this.editingTodo = null;
        this.updateLocalStorage();
      }
    }
  }

  cancelEdit() {
    this.editingTodo = null;
  }

  private updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
