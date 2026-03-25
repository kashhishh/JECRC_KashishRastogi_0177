import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './Task';

@Injectable({
  providedIn: 'root'// singleton service available throughout the app
})
export class TaskService {

  private api = 'https://jsonplaceholder.typicode.com/todos';
  private storageKey = 'tms_local_tasks';

  constructor(private http: HttpClient) {}

  private getLocalTasks(): Task[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch { return []; }
  }

  private saveLocalTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api).pipe(
      map(apiTasks => {
        const localTasks = this.getLocalTasks();
        return [...localTasks, ...apiTasks.slice(0, 20)];
      })
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    const localTasks = this.getLocalTasks();
    const newTask: Task = { ...task, id: Date.now() };
    localTasks.unshift(newTask);
    this.saveLocalTasks(localTasks);
    return of(newTask);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${task.id}`, task);
  }

  patchTask(id: number, completed: boolean): Observable<Task> {
    const localTasks = this.getLocalTasks();
    const idx = localTasks.findIndex(t => t.id === id);
    if (idx > -1) {
      localTasks[idx].completed = completed;
      this.saveLocalTasks(localTasks);
      return of(localTasks[idx]);
    }
    return this.http.patch<Task>(`${this.api}/${id}`, { completed });
  }

  updatePartialTask(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, data);
  }

  deleteTask(id: number): Observable<void> {
    const localTasks = this.getLocalTasks();
    const idx = localTasks.findIndex(t => t.id === id);
    if (idx > -1) {
      localTasks.splice(idx, 1);
      this.saveLocalTasks(localTasks);
      return of(void 0);
    }
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  searchTasks(title: string): Observable<Task[]> {
    return this.getTasks().pipe(
      map(allTasks => allTasks.filter(t =>
        t.title.toLowerCase().includes(title.toLowerCase())
      ))
    );
  }
}