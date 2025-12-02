/**
 * Configuration de l'environnement de production
 */
export const environment = {
  production: true,
  auth0: {
    domain: 'VOTRE_DOMAINE_AUTH0',
    clientId: 'VOTRE_CLIENT_ID',
    authorizationParams: {
      redirect_uri: 'https://votre-domaine.com',  // Remplacez par votre URL de production
    }
  }
};