import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';

  subjectOptions = [
    { value: '', label: 'Sélectionnez un sujet' },
    { value: 'info', label: 'Demande d\'information' },
    { value: 'support', label: 'Support technique' },
    { value: 'bug', label: 'Signaler un bug' },
    { value: 'feature', label: 'Suggestion de fonctionnalité' },
    { value: 'autre', label: 'Autre' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    // Simuler l'envoi du message
    console.log('Message envoyé:', this.contactForm.value);
    this.successMessage = 'Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.';

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      this.contactForm.reset();
      this.submitted = false;
      this.successMessage = '';
    }, 3000);
  }
}
