import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  // Données simulées initiales
  private mockTasks: Task[] = [
    {
      id: 1,
      title: 'Préparer la réunion d\'équipe',
      description: 'Préparer l\'ordre du jour et les documents nécessaires',
      status: 'todo',
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      dueDate: new Date('2024-12-10')
    },
    {
      id: 2,
      title: 'Réviser le code Angular',
      description: 'Faire une revue de code pour optimiser les performances',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2024-01-16')
    },
    {
      id: 3,
      title: 'Déployer la nouvelle version',
      description: 'Mettre en production les dernières fonctionnalités',
      status: 'done',
      priority: 'low',
      createdAt: new Date('2024-01-14'),
      dueDate: new Date('2024-01-20')
    },
  ];

  // Compteur pour générer des IDs uniques
  private nextId = 4;

  getAll(): Observable<Task[]> {
    return of([...this.mockTasks]).pipe(delay(300));
  }

  create(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: this.nextId++
    };
    this.mockTasks.push(newTask);
    return of(newTask).pipe(delay(300));
  }

  update(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Observable<Task> {
    const index = this.mockTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.mockTasks[index] = { ...this.mockTasks[index], ...updates };
      return of(this.mockTasks[index]).pipe(delay(300));
    }
    throw new Error(`Task with id ${id} not found`);
  }

  delete(id: number): Observable<void> {
    this.mockTasks = this.mockTasks.filter(task => task.id !== id);
    return of(void 0).pipe(delay(300));
  }
}
