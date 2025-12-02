import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { serverRoutes } from './app.routes.server';

/**
 * Configuration pour le rendu côté serveur (SSR)
 * Fournit un AuthService factice pour éviter les erreurs d'injection
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideServerRendering(withRoutes(serverRoutes)),
    // Fournit un AuthService factice côté serveur
    {
      provide: AuthService,
      useValue: null
    }
  ]
};

export const config = serverConfig;
