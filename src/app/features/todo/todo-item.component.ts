import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './models/task.model';

/**
 * Composant enfant qui affiche UNE SEULE tâche
 * Il est utilisé par TodoListComponent pour afficher chaque tâche
 */
@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  // @Input : Reçoit la tâche depuis le composant parent
  task = input.required<Task>();

  // @Output : Envoie l'ID de la tâche au parent quand on clique sur "Détails"
  taskAction = output<number>();

  /**
   * Convertit le statut en texte français lisible
   * @param status - Le statut de la tâche
   * @returns Le texte à afficher
   */
  protected getStatusLabel(status: 'todo' | 'in-progress' | 'done'): string {
    if (status === 'done') return 'Terminé';
    if (status === 'in-progress') return 'En cours';
    return 'À faire';
  }

  /**
   * Retourne la classe CSS correspondant au statut
   * @param status - Le statut de la tâche
   * @returns Le nom de la classe CSS à appliquer
   */
  protected getStatusClass(status: 'todo' | 'in-progress' | 'done'): string {
    if (status === 'done') return 'status-done';
    if (status === 'in-progress') return 'status-in-progress';
    return 'status-todo';
  }

  /**
   * Appelé quand on clique sur le bouton "Détails"
   * Envoie l'ID de la tâche au composant parent
   */
  protected onButtonClick(): void {
    this.taskAction.emit(this.task().id);
  }

  /**
   * Convertit la priorité en texte français lisible
   * @param priority - La priorité de la tâche
   * @returns Le texte à afficher
   */
  protected getPriorityLabel(priority: 'low' | 'medium' | 'high'): string {
    if (priority === 'high') return 'Haute';
    if (priority === 'medium') return 'Moyenne';
    return 'Basse';
  }

  /**
   * Retourne la classe CSS correspondant à la priorité
   * @param priority - La priorité de la tâche
   * @returns Le nom de la classe CSS à appliquer
   */
  protected getPriorityClass(priority: 'low' | 'medium' | 'high'): string {
    if (priority === 'high') return 'priority-high';
    if (priority === 'medium') return 'priority-medium';
    return 'priority-low';
  }

  /**
   * Formate une date pour l'affichage
   * @param date - La date à formater
   * @returns La date formatée
   */
  protected formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short'
    });
  }

  /**
   * Vérifie si la date limite est dépassée
   * @param date - La date limite
   * @returns true si la date est dépassée
   */
  protected isOverdue(date: Date | undefined): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
  }
}