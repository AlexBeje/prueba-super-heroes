import { Component, Input, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Biography, Powerstats } from '../types/heroes.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  /** Inputs **/
  title = input<string>();
  image = input<string>();
  biography = input<Biography>();
  powerstats = input<Powerstats>();
}
