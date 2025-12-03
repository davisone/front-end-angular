import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './models/task.model';
import { TodoItemComponent } from './todo-item.component';
import { TaskDetailModalComponent } from './task-detail-modal.component';
import { TodoService } from './services/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Composant qui affiche la liste complète des tâches
 * C'est la page principale pour voir toutes les tâches
 */
@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoItemComponent, TaskDetailModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  // Injection du service qui gère les tâches
  private todoService = inject(TodoService);

  // Récupère toutes les tâches depuis le service via l'observable tasks$
  protected readonly tasks = toSignal(this.todoService.tasks$, { initialValue: [] });

  // Variable pour stocker la tâche sélectionnée (pour le modal)
  // null = aucune tâche sélectionnée (modal fermé)
  protected selectedTask = signal<Task | null>(null);

  /**
   * Appelé quand on clique sur le bouton "Détails" d'une tâche
   * @param taskId - L'ID de la tâche cliquée
   */
  protected onTaskAction(taskId: number): void {
    // Trouve la tâche dans la liste locale (depuis le signal)
    const task = this.tasks().find(t => t.id === taskId);

    // Si la tâche existe, on la stocke pour afficher le modal
    if (task) {
      this.selectedTask.set(task);
    }
  }

  /**
   * Appelé quand on ferme le modal
   * On remet selectedTask à null pour fermer le modal
   */
  protected onCloseModal(): void {
    this.selectedTask.set(null);
  }
}