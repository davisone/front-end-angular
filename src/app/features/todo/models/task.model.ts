/**
 * Modèle représentant une tâche
 * C'est la structure de données pour chaque tâche de notre application
 */
export interface Task {
  id: number;                                    // Identifiant unique de la tâche
  title: string;                                 // Titre/description de la tâche
  description?: string;                          // Description détaillée (optionnelle)
  status: 'todo' | 'in-progress' | 'done';      // Statut: à faire, en cours ou terminé
  priority: 'low' | 'medium' | 'high';          // Priorité de la tâche
  createdAt: Date;                              // Date de création
  dueDate?: Date;                               // Date limite (optionnelle)
}