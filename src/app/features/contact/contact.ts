import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

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

  // Liste des mots interdits
  private bannedWords = ['spam', 'arnaque', 'casino', 'gratuit', 'urgent',];

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
      name: ['', [Validators.required, Validators.minLength(2), this.bannedWordsValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10), this.bannedWordsValidator.bind(this)]]
    });
  }

  // Validateur personnalisé pour vérifier les mots interdits
  private bannedWordsValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const value = control.value.toLowerCase();
    const foundBannedWord = this.bannedWords.find(word => value.includes(word.toLowerCase()));

    if (foundBannedWord) {
      return { bannedWord: { word: foundBannedWord } };
    }

    return null;
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

    // Réinitialiser le formulaire
    setTimeout(() => {
      this.contactForm.reset();
      this.submitted = false;
      this.successMessage = '';
    }, 3000);
  }
}
