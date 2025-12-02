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
  protected status: 'todo' | 'in-progress' | 'done' = 'todo';  // Le statut par défaut

  /**
   * Appelé quand on soumet le formulaire (clic sur "Créer la tâche")
   */
  protected onSubmit(): void {
    // Vérifier que le titre n'est pas vide
    if (this.title.trim()) {

      // Ajouter la tâche via le service
      this.todoService.addTask(this.title.trim(), this.status);
      console.log('Nouvelle tâche créée:', { title: this.title, status: this.status });

      // Réinitialiser le formulaire pour créer une autre tâche
      this.title = '';
      this.status = 'todo';

      // Rediriger vers la liste des tâches pour voir la nouvelle tâche
      this.router.navigate(['/tasks']);
    }
  }
}