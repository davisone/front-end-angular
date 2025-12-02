import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './models/task.model';

/**
 * Composant modal (fenêtre popup) qui affiche les détails d'une tâche
 * S'affiche par-dessus la page quand on clique sur "Détails"
 */
@Component({
  selector: 'app-task-detail-modal',
  imports: [CommonModule],
  templateUrl: './task-detail-modal.component.html',
  styleUrl: './task-detail-modal.component.css'
})
export class TaskDetailModalComponent {

  // @Input : Reçoit la tâche à afficher depuis le composant parent
  task = input.required<Task>();

  // @Output : Envoie un signal au parent quand on ferme le modal
  closeModal = output<void>();

  /**
   * Appelé quand on clique sur le bouton de fermeture ou l'overlay
   * Envoie un signal au parent pour fermer le modal
   */
  protected onClose(): void {
    this.closeModal.emit();
  }

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
}