/**
 * Configuration de l'environnement de développement
 * IMPORTANT : Ne jamais commit les vraies valeurs Auth0 dans Git
 */
export const environment = {
  production: false,
  auth0: {
    domain: 'dev-1vsgziyqcf0egpgx.us.auth0.com',
    clientId: 'vRDQkaZnTl9hiA5dWuBn7NF9T5mTnjrR',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200',
    }
  }
};
