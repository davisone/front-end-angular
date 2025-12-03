import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Composant Footer affiché en bas de toutes les pages
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  /**
   * Année courante pour le copyright
   */
  protected currentYear = new Date().getFullYear();
}
