import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private readonly STORAGE_KEY = 'tasks';
  private readonly NEXT_ID_KEY = 'tasks_next_id';

  // Données simulées initiales (utilisées uniquement si localStorage est vide)
  private readonly DEFAULT_TASKS: Task[] = [
    {
      id: 1,
      title: 'kyky de bondy',
      description: 'ballon d\'or',
      status: 'todo',
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      dueDate: new Date('2024-12-10')
    },
    {
      id: 2,
      title: 'CR7',
      description: 'suuuuuuuuuuuuuu',
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

  private mockTasks: Task[] = [];
  private nextId: number = 4;

  constructor() {
    // Charger les tâches depuis localStorage au démarrage
    this.loadFromStorage();
  }

  /**
   * Charge les tâches depuis localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const storedNextId = localStorage.getItem(this.NEXT_ID_KEY);

      if (stored) {
        // Charger les tâches existantes
        const parsedTasks = JSON.parse(stored);
        // Reconvertir les dates (elles sont stockées comme strings)
        this.mockTasks = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        }));
      } else {
        // Première utilisation : charger les données par défaut
        this.mockTasks = [...this.DEFAULT_TASKS];
        this.saveToStorage();
      }

      // Charger le compteur d'ID
      if (storedNextId) {
        this.nextId = parseInt(storedNextId, 10);
      }
    } catch (error) {
      console.error('Erreur lors du chargement depuis localStorage:', error);
      this.mockTasks = [...this.DEFAULT_TASKS];
    }
  }

  /**
   * Sauvegarde les tâches dans localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.mockTasks));
      localStorage.setItem(this.NEXT_ID_KEY, this.nextId.toString());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  }

  getAll(): Observable<Task[]> {
    return of([...this.mockTasks]).pipe(delay(300));
  }

  create(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: this.nextId++
    };
    this.mockTasks.push(newTask);
    this.saveToStorage(); // Sauvegarder après création
    return of(newTask).pipe(delay(300));
  }

  update(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Observable<Task> {
    const index = this.mockTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.mockTasks[index] = { ...this.mockTasks[index], ...updates };
      this.saveToStorage(); // Sauvegarder après mise à jour
      return of(this.mockTasks[index]).pipe(delay(300));
    }
    throw new Error(`Task with id ${id} not found`);
  }

  delete(id: number): Observable<void> {
    this.mockTasks = this.mockTasks.filter(task => task.id !== id);
    this.saveToStorage(); // Sauvegarder après suppression
    return of(void 0).pipe(delay(300));
  }
}
