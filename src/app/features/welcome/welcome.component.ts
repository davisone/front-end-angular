import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

/**
 * Page de bienvenue affichée avant la connexion
 * Force l'utilisateur à se connecter pour accéder à l'application
 */
@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  private auth = inject(AuthService);

  /**
   * Lance le processus de connexion Auth0
   */
  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/dashboard'
      }
    });
  }
}