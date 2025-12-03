import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskUtilsService {

  getStatusLabel(status: 'todo' | 'in-progress' | 'done'): string {
    switch (status) {
      case 'todo': return 'À faire';
      case 'in-progress': return 'En cours';
      case 'done': return 'Terminée';
    }
  }

  getStatusClass(status: 'todo' | 'in-progress' | 'done'): string {
    switch (status) {
      case 'todo': return 'status-todo';
      case 'in-progress': return 'status-in-progress';
      case 'done': return 'status-done';
    }
  }

  /**
   * Retourne le label français de la priorité d'une tâche
   */
  getPriorityLabel(priority: 'low' | 'medium' | 'high'): string {
    switch (priority) {
      case 'low': return 'Basse';
      case 'medium': return 'Moyenne';
      case 'high': return 'Haute';
    }
  }

  /**
   * Retourne la classe CSS correspondant à la priorité
   */
  getPriorityClass(priority: 'low' | 'medium' | 'high'): string {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
    }
  }

  /**
   * Formate une date en format français court (JJ/MM/AAAA)
   */
  formatDate(date: Date | undefined): string {
    if (!date) {
      return 'Aucune';
    }
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  }
}
