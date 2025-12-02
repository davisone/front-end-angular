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
}