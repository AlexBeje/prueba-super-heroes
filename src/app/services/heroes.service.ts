import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import type { Hero } from '../types/heroes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  isBrowser = inject(PLATFORM_ID) === 'browser';

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(
      'https://akabab.github.io/superhero-api/api/all.json',
    );
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(
      `https://akabab.github.io/superhero-api/api/id/${id}.json`,
    );
  }

  getMyHeroes(): Hero[] {
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem('myHeroes') || '[]');
    } else {
      return [];
    }
  }

  addHero(hero: Hero): void {
    const myHeroes = this.getMyHeroes();
    if (this.isBrowser) {
      localStorage.setItem('myHeroes', JSON.stringify([...myHeroes, hero]));
    }
  }

  editHero(hero: Hero): void {
    const myHeroes = this.getMyHeroes();
    if (this.isBrowser) {
      const index = myHeroes.findIndex((h: Hero) => h.id === hero.id);
      myHeroes[index] = hero;
      localStorage.setItem('myHeroes', JSON.stringify(myHeroes));
    }
  }

  deleteHero(hero: Hero): void {
    const myHeroes = this.getMyHeroes();
    if (this.isBrowser) {
      const index = myHeroes.findIndex((h: Hero) => h.id === hero.id);
      myHeroes.splice(index, 1);
      localStorage.setItem('myHeroes', JSON.stringify(myHeroes));
    }
  }
}
