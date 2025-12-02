import { Component } from '@angular/core';

/**
 * Composant Footer affiché en bas de toutes les pages
 */
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  /**
   * Année courante pour le copyright
   */
  protected currentYear = new Date().getFullYear();
}
