import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasklist.html',
  styleUrls: ['./tasklist.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  searchText: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

  toggleStatus(task: Task) {
    this.taskService.patchTask(task.id!, !task.completed).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  search() {
    if (this.searchText.trim()) {
      this.taskService.searchTasks(this.searchText).subscribe(data => {
        this.tasks = data;
      });
    } else {
      this.loadTasks();
    }
  }
}