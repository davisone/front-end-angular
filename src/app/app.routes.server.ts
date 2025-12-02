import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Configuration du rendu côté serveur
 * Utilise RenderMode.Server pour toutes les routes pendant le développement
 * car Auth0 nécessite le navigateur (pas compatible avec le prérendu)
 *
 * Pour la production : vous pouvez activer le prérendu pour les pages publiques
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server  // Pas de prérendu, rendu dynamique uniquement
  }
];
