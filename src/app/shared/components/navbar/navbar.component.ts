import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

/**
 * Composant de la barre de navigation
 * Affiche les liens et les boutons de connexion/déconnexion
 */
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // Injection du service Auth0
  protected auth = inject(AuthService);

  /**
   * Connecte l'utilisateur via Auth0
   * Redirige vers la page de connexion universelle Auth0
   * Après connexion, redirige vers le dashboard
   */
  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/dashboard'  // Redirige vers le dashboard après connexion
      }
    });
  }

  /**
   * Déconnecte l'utilisateur
   * Suit les bonnes pratiques OWASP pour la déconnexion sécurisée
   */
  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin  // Retourne à la page d'accueil après déconnexion
      }
    });
  }
}