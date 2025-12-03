import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Composant principal de l'application
 * Gère le callback Auth0 et la navigation conditionnelle
 */
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  // Observable pour savoir si l'utilisateur est connecté (utilisé dans le template)
  protected isAuthenticated$ = this.auth.isAuthenticated$;

  constructor() {
    // Gestion de la navigation après connexion
    this.auth.isAuthenticated$.pipe(
      takeUntilDestroyed()
    ).subscribe(isAuthenticated => {
      console.log('[App] État authentification:', isAuthenticated);

      if (isAuthenticated) {
        // Utilisateur connecté
        this.auth.user$.pipe(
          takeUntilDestroyed()
        ).subscribe(user => {
          console.log('[App] Utilisateur connecté:', user);
        });

        // Si on est sur la page de bienvenue ou accueil, rediriger vers dashboard
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath === '/welcome') {
          console.log('[App] Redirection vers dashboard');
          this.router.navigate(['/dashboard']);
        }
      } else {
        // Utilisateur non connecté - rester sur la page de bienvenue
        console.log('[App] Utilisateur non connecté');
      }
    });

    // Debug : vérifier si Auth0 est en train de charger
    this.auth.isLoading$.pipe(
      takeUntilDestroyed()
    ).subscribe(isLoading => {
      console.log('[App] Auth0 chargement:', isLoading);
    });

    // Debug : vérifier les erreurs Auth0
    this.auth.error$.pipe(
      takeUntilDestroyed()
    ).subscribe(error => {
      if (error) {
        console.error('[App] Erreur Auth0:', error);
      }
    });
  }
}
