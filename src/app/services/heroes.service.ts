import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import type { Hero } from '../types/heroes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  /** Variables **/
  isBrowser = inject(PLATFORM_ID) === 'browser';

  /** Signals **/
  heroes = signal<Hero[]>([]);
  myHeroes = signal<Hero[]>([]);
  filteredHeroes = signal<Hero[] | null>(null);
  filteredMyHeroes = signal<Hero[] | null>(null);
  filterBy = signal('');

  /** Getters **/
  getHeroes(): Hero[] {
    return this.heroes();
  }
  getMyHeroes(): Hero[] {
    return this.myHeroes();
  }
  getFilterByValue(): string {
    return this.filterBy();
  }

  /** Fetchers **/
  fetchMyHeroes(): void {
    if (this.isBrowser) {
      this.myHeroes.set(JSON.parse(localStorage.getItem('myHeroes') || '[]'));
    }
  }
  fetchHeroes(): void {
    this.http
      .get<Hero[]>('https://akabab.github.io/superhero-api/api/all.json')
      .subscribe((heroes) => {
        this.heroes.set(heroes);
      });
  }

  /** Actions **/
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
