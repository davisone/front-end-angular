import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskApiService } from './task-api.service';
import { TaskStore } from './task.store';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Observable public pour que les composants puissent s'abonner
  public tasks$: Observable<Task[]>;

  constructor(
    private taskApiService: TaskApiService,
    private taskStore: TaskStore
  ) {
    // Initialiser l'observable après l'injection
    this.tasks$ = this.taskStore.tasks$;

    // Charger les tâches initiales au démarrage
    this.loadTasks();
  }

  /**
   * Charge toutes les tâches depuis l'API
   */
  private loadTasks(): void {
    this.taskApiService.getAll().subscribe({
      next: (tasks) => {
        this.taskStore.setTasks(tasks);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    });
  }

  addTask(
    title: string,
    status: 'todo' | 'in-progress' | 'done',
    description?: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    dueDate?: Date
  ): void {
    // Créer la nouvelle tâche (sans ID, il sera généré par l'API)
    const newTask: Omit<Task, 'id'> = {
      title: title,
      description: description,
      status: status,
      priority: priority,
      createdAt: new Date(),
      dueDate: dueDate
    };

    // Appeler l'API pour créer la tâche
    this.taskApiService.create(newTask).subscribe({
      next: (createdTask) => {
        // Mettre à jour le store avec la nouvelle tâche
        this.taskStore.addTask(createdTask);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la tâche:', error);
      }
    });
  }

  deleteTask(id: number): void {
    // Appeler l'API pour supprimer la tâche
    this.taskApiService.delete(id).subscribe({
      next: () => {
        // Mettre à jour le store en retirant la tâche supprimée
        this.taskStore.removeTask(id);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la tâche:', error);
      }
    });
  }

  updateTaskStatus(id: number, status: 'todo' | 'in-progress' | 'done'): void {
    // Appeler l'API pour mettre à jour le statut
    this.taskApiService.update(id, { status }).subscribe({
      next: (updatedTask) => {
        // Mettre à jour le store avec la tâche mise à jour
        this.taskStore.updateTask(updatedTask);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    });
  }

  updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    // Appeler l'API pour mettre à jour la tâche
    this.taskApiService.update(id, updates).subscribe({
      next: (updatedTask) => {
        // Mettre à jour le store avec la tâche mise à jour
        this.taskStore.updateTask(updatedTask);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
      }
    });
  }
}
