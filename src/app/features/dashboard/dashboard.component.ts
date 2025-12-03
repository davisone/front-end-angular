import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo/services/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private todoService = inject(TodoService);

  // Convertir l'observable en signal
  private tasks = toSignal(this.todoService.tasks$, { initialValue: [] });

  // Calculer les statistiques à partir des tâches
  protected todoCount = computed(() =>
    this.tasks().filter(task => task.status === 'todo').length
  );

  protected inProgressCount = computed(() =>
    this.tasks().filter(task => task.status === 'in-progress').length
  );

  protected doneCount = computed(() =>
    this.tasks().filter(task => task.status === 'done').length
  );
}