import { Component, computed, signal, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeroesService } from '../services/heroes.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButton,
  ],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent {
  /** Injectables **/
  heroesService = inject(HeroesService);

  /** Signals **/
  searchValue = signal('');

  /** Computed **/
  // allHeroes = computed(() => this.heroesService.getAllHeroes());
  myHeroes = computed(() => this.heroesService.getMyHeroes());

  /** Methods **/
  searchHero() {
    this.heroesService.filterHeroesByName(this.searchValue());
  }
}
