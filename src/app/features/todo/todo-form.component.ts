import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from './services/todo.service';

/**
 * Composant formulaire pour créer une nouvelle tâche
 * Page accessible via le menu "Créer une tâche"
 */
@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {

  // Injection du service pour ajouter la tâche
  private todoService = inject(TodoService);

  // Injection du router pour rediriger après la création
  private router = inject(Router);

  // Variables liées aux champs du formulaire
  protected title = '';                                    // Le titre de la tâche
  protected description = '';                              // La description
  protected status: 'todo' | 'in-progress' | 'done' = 'todo';  // Le statut par défaut
  protected priority: 'low' | 'medium' | 'high' = 'medium';    // La priorité par défaut
  protected dueDate = '';                                  // Date limite (format ISO string)

  /**
   * Appelé quand on soumet le formulaire (clic sur "Créer la tâche")
   */
  protected onSubmit(): void {
    // Vérifier que le titre n'est pas vide
    if (this.title.trim()) {

      // Convertir la date string en objet Date si elle est renseignée
      const dueDateObj = this.dueDate ? new Date(this.dueDate) : undefined;

      // Ajouter la tâche via le service
      this.todoService.addTask(
        this.title.trim(),
        this.status,
        this.description.trim() || undefined,
        this.priority,
        dueDateObj
      );

      console.log('Nouvelle tâche créée:', {
        title: this.title,
        description: this.description,
        status: this.status,
        priority: this.priority,
        dueDate: dueDateObj
      });

      // Réinitialiser le formulaire pour créer une autre tâche
      this.title = '';
      this.description = '';
      this.status = 'todo';
      this.priority = 'medium';
      this.dueDate = '';

      // Rediriger vers la liste des tâches pour voir la nouvelle tâche
      this.router.navigate(['/tasks']);
    }
  }
}