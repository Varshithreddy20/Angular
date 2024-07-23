import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Components';
  tasks: string[] = ['Task1', 'Task2', 'Task3', 'Task4'];

  deleteTask(task: string) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }
}
