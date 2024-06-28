import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import type { Hero } from '../types/heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesStore {
  /** Variables **/
  isBrowser = inject(PLATFORM_ID) === 'browser';
  heroesService = inject(HeroesService);

  /** Signals **/
  heroes = signal<Hero[]>([]);
  myHeroes = signal<Hero[]>([]);
  filteredHeroes = signal<Hero[] | null>(null);
  filteredMyHeroes = signal<Hero[] | null>(null);
  filterBy = signal('');

  /** Actions **/
  getHeroes(): void {
    this.heroesService.fetchHeroes().subscribe((heroes) => {
      this.heroes.set(heroes);
    });
  }
  getMyHeroes(): void {
    if (this.isBrowser) {
      this.myHeroes.set(this.heroesService.fetchMyHeroes());
    }
  }

  addHero(hero: Hero): void {
    if (this.isBrowser) {
      localStorage.setItem(
        'myHeroes',
        JSON.stringify([...this.myHeroes(), hero]),
      );
    }
  }
  editHero(hero: Hero): void {
    if (this.isBrowser) {
      const index = this.myHeroes().findIndex((h: Hero) => h.id === hero.id);
      this.myHeroes()[index] = hero;
      localStorage.setItem('myHeroes', JSON.stringify(this.myHeroes()));
    }
  }
  deleteHero(hero: Hero): void {
    if (this.isBrowser) {
      const index = this.myHeroes().findIndex((h: Hero) => h.id === hero.id);
      this.myHeroes().splice(index, 1);
      localStorage.setItem('myHeroes', JSON.stringify(this.myHeroes()));
    }
  }
  setFilterByValue(value: string): void {
    this.filterBy.set(value);
  }
  filterHeroes() {
    if (this.filterBy() === '') {
      this.filteredMyHeroes.set(null);
      this.filteredHeroes.set(null);
      return;
    }
    this.filteredMyHeroes.set(
      this.myHeroes().filter((hero) =>
        hero.name.toLowerCase().includes(this.filterBy().toLowerCase()),
      ),
    );
    this.filteredHeroes.set(
      this.heroes().filter((hero) =>
        hero.name.toLowerCase().includes(this.filterBy().toLowerCase()),
      ),
    );
  }
}
