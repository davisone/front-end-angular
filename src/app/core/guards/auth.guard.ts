import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

/**
 * Guard d'authentification
 * Protège les routes en vérifiant si l'utilisateur est connecté
 * Suit les bonnes pratiques OWASP pour la gestion de session
 */
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      console.log('[authGuard] Vérification authentification:', isAuthenticated);
      if (isAuthenticated) {
        // Utilisateur connecté, accès autorisé
        console.log('[authGuard] ✅ Accès autorisé');
        return true;
      } else {
        // Utilisateur non connecté, redirection vers la page de bienvenue
        console.warn('[authGuard] ❌ Accès refusé : authentification requise');
        router.navigate(['/welcome']);
        return false;
      }
    })
  );
};