import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TodoListComponent } from './features/todo/todo-list.component';
import { TodoFormComponent } from './features/todo/todo-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TodoListComponent },
  { path: 'tasks/create', component: TodoFormComponent },
];
