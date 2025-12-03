import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskStore {

  // BehaviorSubject privé pour stocker les tâches
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // Observable public en lecture seule pour que les composants puissent s'abonner
  public readonly tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next(
      currentTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  }

  removeTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next(currentTasks.filter(task => task.id !== id));
  }
}
