import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './models/task.model';
import { TaskUtilsService } from './services/task-utils.service';

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
  protected taskUtils = inject(TaskUtilsService);

  // @Input : Reçoit la tâche depuis le composant parent
  task = input.required<Task>();

  // @Output : Envoie l'ID de la tâche au parent quand on clique sur "Détails"
  taskAction = output<number>();

  /**
   * Appelé quand on clique sur le bouton "Détails"
   * Envoie l'ID de la tâche au composant parent
   */
  protected onButtonClick(): void {
    this.taskAction.emit(this.task().id);
  }

  /**
   * Formate une date pour l'affichage (format court)
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