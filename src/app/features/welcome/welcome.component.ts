import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  private auth = inject(AuthService);

  /*** Lance le processus de connexion Auth0*/
  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/dashboard'
      }
    });
  }
}
