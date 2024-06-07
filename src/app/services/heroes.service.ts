import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Hero } from '../types/heroes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(
      'https://akabab.github.io/superhero-api/api/all.json'
    );
  }
}
