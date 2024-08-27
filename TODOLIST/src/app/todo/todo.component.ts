import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  editingTodo: Todo | null = null;
  showAddAlert = false;
  showDeleteAlert = false;
  showConfirmDialog = false;
  confirmedDeleteId: number | null = null;
  userForm: FormGroup;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

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
    if (this.userForm.valid) {
      const newTodo: Todo = {
        id: 0,
        name: this.userForm.value.name,
        description: this.userForm.value.description,
      };

      this.todoService.createTodo(newTodo).subscribe(
        (todo) => {
          this.todos.push(todo);
          this.userForm.reset();
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
