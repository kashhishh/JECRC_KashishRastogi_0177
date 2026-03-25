import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../Task';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {

  task: Task = {
    title: '',
    completed: false
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  saveTask() {
    if (!this.task.title.trim()) {
      this.errorMessage = 'Task title cannot be empty!';
      this.successMessage = '';
      return;
    }

    this.taskService.addTask(this.task).subscribe({
      next: (savedTask) => {
        this.successMessage = `Task "${savedTask.title}" saved successfully!`;
        this.errorMessage = '';
        
        this.router.navigate(['/'], { state: { newTask: savedTask } });
      },
      error: () => {
        this.errorMessage = 'Failed to save task. Please try again.';
        this.successMessage = '';
      }
    });
  }

  resetForm() {
    this.task = { title: '', completed: false };
    this.successMessage = '';
    this.errorMessage = '';
  }
}