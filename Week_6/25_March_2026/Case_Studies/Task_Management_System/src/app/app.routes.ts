import { Routes } from '@angular/router';
import { TaskListComponent } from './tasklist/tasklist';
import { TaskFormComponent } from './task-form/task-form';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add', component: TaskFormComponent }
];