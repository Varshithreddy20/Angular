import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Todo {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { id: 0, name: '', description: '' };
  editingTodo: Todo | null = null;
  showAddAlert = false;
  showDeleteAlert = false;
  showConfirmDialog = false;
  confirmedDeleteId: number | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(
      (todos) => {
        this.todos = todos;
      },
      (error) => {
        console.error('Error loading todos:', error);
      }
    );
  }

  addTodo() {
    if (this.newTodo.name && this.newTodo.description) {
      this.todoService.createTodo(this.newTodo).subscribe(
        (todo) => {
          this.todos.push(todo);
          this.newTodo = { id: 0, name: '', description: '' };
          this.showAddAlert = true;
          setTimeout(() => (this.showAddAlert = false), 1000);
        },
        (error) => {
          console.error('Error adding todo:', error);
        }
      );
    }
  }

  confirmDelete(id: number) {
    this.confirmedDeleteId = id;
    this.showConfirmDialog = true;
  }

  deleteTodo(id: number) {
    if (id !== null) {
      this.todoService.deleteTodo(id).subscribe(
        () => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
          this.showConfirmDialog = false;
          this.confirmedDeleteId = null;
          this.showDeleteAlert = true;
          setTimeout(() => (this.showDeleteAlert = false), 1000);
        },
        (error) => {
          console.error('Error deleting todo:', error);
        }
      );
    }
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.confirmedDeleteId = null;
  }

  startEdit(todo: Todo) {
    this.editingTodo = { ...todo };
  }

  saveEdit() {
    if (this.editingTodo) {
      const index = this.todos.findIndex((t) => t.id === this.editingTodo!.id);
      if (index !== -1) {
        this.todoService.updateTodo(this.editingTodo).subscribe(
          () => {
            this.todos[index] = { ...this.editingTodo! };
            this.editingTodo = null;
          },
          (error) => {
            console.error('Error updating todo:', error);
          }
        );
      }
    }
  }

  cancelEdit() {
    this.editingTodo = null;
  }
}
