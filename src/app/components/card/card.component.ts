import { Component, Input, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { Biography, Powerstats } from '../../types/heroes.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  /** Inputs **/
  title = input<string>();
  image = input<string>();
  biography = input<Biography>();
  powerstats = input<Powerstats>();

  /** Variables **/
  biographyExpanded = signal(true);

  /** Methods **/
  toggleBiography() {
    this.biographyExpanded.set(!this.biographyExpanded());
  }
}
