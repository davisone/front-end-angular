import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { TodoService } from './services/todo.service';

/**
 * Composant modal (fenêtre popup) qui affiche les détails d'une tâche
 * S'affiche par-dessus la page quand on clique sur "Détails"
 * Permet aussi de modifier le statut de la tâche
 */
@Component({
  selector: 'app-task-detail-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail-modal.component.html',
  styleUrl: './task-detail-modal.component.css'
})
export class TaskDetailModalComponent {

  // Injection du service pour modifier le statut
  private todoService = inject(TodoService);

  // @Input : Reçoit la tâche à afficher depuis le composant parent
  task = input.required<Task>();

  // @Output : Envoie un signal au parent quand on ferme le modal
  closeModal = output<void>();

  // Variable pour stocker le statut sélectionné dans le select
  protected selectedStatus = signal<'todo' | 'in-progress' | 'done'>('todo');

  /**
   * Appelé automatiquement quand la tâche change
   * Initialise le statut sélectionné avec le statut de la tâche
   */
  ngOnInit(): void {
    this.selectedStatus.set(this.task().status);
  }

  /**
   * Appelé quand on clique sur le bouton de fermeture ou l'overlay
   * Envoie un signal au parent pour fermer le modal
   */
  protected onClose(): void {
    this.closeModal.emit();
  }

  /**
   * Appelé quand on change le statut dans le select
   * Met à jour le statut de la tâche dans le service
   */
  protected onStatusChange(): void {
    const newStatus = this.selectedStatus();
    this.todoService.updateTaskStatus(this.task().id, newStatus);
    console.log(`Statut changé pour la tâche ${this.task().id}: ${newStatus}`);
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