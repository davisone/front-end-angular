import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

/**
 * Configuration principale de l'application
 * SSR désactivé pour compatibilité totale avec Auth0
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Configuration Auth0 avec les bonnes pratiques de sécurité OWASP
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.authorizationParams.redirect_uri,
      },
      // Bonnes pratiques de sécurité OWASP :
      // - Utilise PKCE (Proof Key for Code Exchange) par défaut
      // - Utilise le flow Authorization Code (plus sécurisé)
      // - Stockage sécurisé des tokens
    })
  ]
};
