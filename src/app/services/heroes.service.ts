import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Hero } from '../types/heroes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  /** Variables **/
  isBrowser = inject(PLATFORM_ID) === 'browser';

  /** Fetchers **/
  fetchMyHeroes(): [] | Hero[] {
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem('myHeroes') || '[]');
    } else {
      return [];
    }
  }
  fetchHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(
      'https://akabab.github.io/superhero-api/api/all.json',
    );
  }
}
