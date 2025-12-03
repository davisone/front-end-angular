import { Component } from '@angular/core';

/**
 * Composant Footer affiché en bas de toutes les pages
 */
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  /**
   * Année courante pour le copyright
   */
  protected currentYear = new Date().getFullYear();
}
