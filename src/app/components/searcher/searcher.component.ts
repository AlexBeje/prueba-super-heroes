import { Component, signal, inject, effect, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeroesStore } from '../../stores/heroes.store';
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
  heroesStore = inject(HeroesStore);

  /** Signals **/
  searchInput = signal('');

  /** Computed **/
  filterBy = computed(() => this.heroesStore.filterBy());

  /** Watchers **/
  constructor() {
    effect(
      () => {
        if (!this.filterBy()) {
          this.searchInput.set('');
        }
      },
      { allowSignalWrites: true },
    );
  }

  /** Methods **/
  searchHero() {
    this.heroesStore.setFilterByValue(this.searchInput());
    this.heroesStore.filterHeroes();
  }
  resetSearchHero(event: Event) {
    event.stopPropagation();
    this.searchInput.set('');
    this.heroesStore.setFilterByValue(this.searchInput());
    this.heroesStore.filterHeroes();
  }
}
