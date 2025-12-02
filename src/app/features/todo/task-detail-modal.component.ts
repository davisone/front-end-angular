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

  // Variables pour éditer les champs
  protected editedTitle = signal<string>('');
  protected editedDescription = signal<string>('');
  protected selectedStatus = signal<'todo' | 'in-progress' | 'done'>('todo');
  protected selectedPriority = signal<'low' | 'medium' | 'high'>('medium');
  protected editedDueDate = signal<string>('');

  // Flag pour détecter si des modifications ont été faites
  private hasModifications = signal<boolean>(false);

  /**
   * Appelé automatiquement quand le composant s'initialise
   * Initialise les champs avec les valeurs de la tâche
   */
  ngOnInit(): void {
    const currentTask = this.task();
    this.editedTitle.set(currentTask.title);
    this.editedDescription.set(currentTask.description || '');
    this.selectedStatus.set(currentTask.status);
    this.selectedPriority.set(currentTask.priority);
    this.editedDueDate.set(currentTask.dueDate ? this.toDateInputFormat(currentTask.dueDate) : '');
  }

  /**
   * Appelé quand on clique sur le bouton de fermeture ou l'overlay
   * Envoie un signal au parent pour fermer le modal
   */
  protected onClose(): void {
    this.closeModal.emit();
  }

  /**
   * Appelé quand un champ est modifié
   * Active le flag de modification
   */
  protected onFieldChange(): void {
    this.hasModifications.set(true);
  }

  /**
   * Vérifie si des modifications ont été faites
   * @returns true si des modifications ont été faites
   */
  protected hasChanges(): boolean {
    return this.hasModifications();
  }

  /**
   * Sauvegarde les modifications dans le service
   */
  protected onSave(): void {
    const updates: Partial<Omit<Task, 'id' | 'createdAt'>> = {
      title: this.editedTitle(),
      description: this.editedDescription() || undefined,
      status: this.selectedStatus(),
      priority: this.selectedPriority(),
      dueDate: this.editedDueDate() ? new Date(this.editedDueDate()) : undefined
    };

    this.todoService.updateTask(this.task().id, updates);
    console.log('Tâche mise à jour:', this.task().id, updates);

    // Réinitialiser le flag de modification
    this.hasModifications.set(false);

    // Fermer le modal
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
  protected formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  /**
   * Convertit une date en format pour input type="date"
   * @param date - La date à convertir
   * @returns La date au format YYYY-MM-DD
   */
  private toDateInputFormat(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}