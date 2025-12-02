import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

/**
 * base de données centralisée pour les tâches
 */
@Injectable({
  providedIn: 'root'  // Ce service est disponible dans toute l'application
})
export class TodoService {

  // Liste privée des tâches (personne ne peut la modifier directement de l'extérieur)
  private tasks = signal<Task[]>([
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
      title: 'suuuuuuuuuuu',
      description: 'Célébration victoire',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2024-01-16')
    },
    {
      id: 3,
      title: 'kyky de bondy',
      description: 'Le meilleur joueur du monde',
      status: 'done',
      priority: 'low',
      createdAt: new Date('2024-01-14'),
      dueDate: new Date('2024-01-20')
    },
  ]);

  // Compteur pour générer des IDs uniques pour chaque nouvelle tâche
  private nextId = 4;

  // Version en lecture seule des tâches (les composants peuvent lire mais pas modifier)
  readonly allTasks = this.tasks.asReadonly();

  /**
   * Ajoute une nouvelle tâche à la liste
   * @param title - Le titre de la tâche
   * @param status - Le statut de la tâche (todo, in-progress ou done)
   * @param description - Description détaillée (optionnelle)
   * @param priority - Priorité de la tâche
   * @param dueDate - Date limite (optionnelle)
   */
  addTask(
    title: string,
    status: 'todo' | 'in-progress' | 'done',
    description?: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    dueDate?: Date
  ): void {
    // Créer la nouvelle tâche avec un ID unique
    const newTask: Task = {
      id: this.nextId++,
      title: title,
      description: description,
      status: status,
      priority: priority,
      createdAt: new Date(),
      dueDate: dueDate
    };

    // Ajouter la nouvelle tâche à la liste existante
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  /**
   * Trouve une tâche par son ID
   * @param id - L'identifiant de la tâche à trouver
   * @returns La tâche trouvée ou undefined si elle n'existe pas
   */
  getTaskById(id: number): Task | undefined {
    return this.tasks().find(task => task.id === id);
  }

  /**
   * Supprime une tâche de la liste
   * @param id - L'identifiant de la tâche à supprimer
   */
  deleteTask(id: number): void {
    // Garde toutes les tâches sauf celle avec l'ID donné
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  /**
   * Change le statut d'une tâche
   * @param id - L'identifiant de la tâche
   * @param status - Le nouveau statut
   */
  updateTaskStatus(id: number, status: 'todo' | 'in-progress' | 'done'): void {
    // Parcourt toutes les tâches et change le statut de celle qui correspond
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status: status } : task
      )
    );
  }

  /**
   * Met à jour une tâche complètement
   * @param id - L'identifiant de la tâche
   * @param updates - Les champs à mettre à jour
   */
  updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }
}
