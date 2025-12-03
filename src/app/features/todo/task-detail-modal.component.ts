import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { TodoService } from './services/todo.service';

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

  ngOnInit(): void {
    const currentTask = this.task();
    this.editedTitle.set(currentTask.title);
    this.editedDescription.set(currentTask.description || '');
    this.selectedStatus.set(currentTask.status);
    this.selectedPriority.set(currentTask.priority);
    this.editedDueDate.set(currentTask.dueDate ? this.toDateInputFormat(currentTask.dueDate) : '');
  }

  protected onClose(): void {
    this.closeModal.emit();
  }

  protected onFieldChange(): void {
    this.hasModifications.set(true);
  }


  protected hasChanges(): boolean {
    return this.hasModifications();
  }

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

  protected getStatusLabel(status: 'todo' | 'in-progress' | 'done'): string {
    if (status === 'done') return 'Terminé';
    if (status === 'in-progress') return 'En cours';
    return 'À faire';
  }

  protected getStatusClass(status: 'todo' | 'in-progress' | 'done'): string {
    if (status === 'done') return 'status-done';
    if (status === 'in-progress') return 'status-in-progress';
    return 'status-todo';
  }

  protected getPriorityLabel(priority: 'low' | 'medium' | 'high'): string {
    if (priority === 'high') return 'Haute';
    if (priority === 'medium') return 'Moyenne';
    return 'Basse';
  }

  protected getPriorityClass(priority: 'low' | 'medium' | 'high'): string {
    if (priority === 'high') return 'priority-high';
    if (priority === 'medium') return 'priority-medium';
    return 'priority-low';
  }

  protected formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  private toDateInputFormat(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
