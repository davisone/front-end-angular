/**
 * Modèle représentant une tâche
 * C'est la structure de données pour chaque tâche de notre application
 */
export interface Task {
  id: number;                                    // Identifiant unique de la tâche
  title: string;                                 // Titre/description de la tâche
  status: 'todo' | 'in-progress' | 'done';      // Statut: à faire, en cours ou terminé
}