import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeroesService } from '../services/heroes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent {
  /** Injectables **/
  heroesService = inject(HeroesService);

  /** Signals **/
  searchValue = signal('');

  /** Methods **/
  searchHero() {
    this.heroesService.filterHeroesByName(this.searchValue());
  }
  resetSearchHero(event: Event) {
    event.stopPropagation();
    this.searchValue.set('');
    this.heroesService.filterHeroesByName('');
  }
}
