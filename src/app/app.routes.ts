import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TodoListComponent } from './features/todo/todo-list.component';
import { TodoFormComponent } from './features/todo/todo-form.component';
import { authGuard } from './core/guards/auth.guard';

/**
 * Configuration des routes de l'application
 * - Page de bienvenue : accessible sans connexion
 * - Autres routes : nécessitent une authentification (canActivate: [authGuard])
 */
export const routes: Routes = [
  // Route de bienvenue - accessible sans connexion
  { path: 'welcome', component: WelcomeComponent },

  // Redirige la page d'accueil vers la page de bienvenue
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

  // Routes protégées - nécessitent une authentification
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]  // Vérifie que l'utilisateur est connecté
  },
  {
    path: 'tasks',
    component: TodoListComponent,
    canActivate: [authGuard]  // Vérifie que l'utilisateur est connecté
  },
  {
    path: 'tasks/create',
    component: TodoFormComponent,
    canActivate: [authGuard]  // Vérifie que l'utilisateur est connecté
  },
];
