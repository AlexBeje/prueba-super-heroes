import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { Hero } from '../types/heroes.interface';
import { HeroesService } from '../services/heroes.service';
import { CardComponent } from '../card/card.component';
import { BannerComponent } from '../banner/banner.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-heroes-db',
  standalone: true,
  templateUrl: './heroes-db.component.html',
  imports: [CardComponent, BannerComponent, MatButton],
})
export class HeroesDbComponent implements OnInit {
  /** Variables **/
  heroesService = inject(HeroesService);
  isBrowser = inject(PLATFORM_ID) === 'browser';
  isServer = inject(PLATFORM_ID) === 'server';

  /** Signals **/
  heroes = signal<Hero[]>([]);
  currentHeroes = signal<Hero[]>([]);
  selectedHero = signal<Hero | null>(null);

  /** Lifecycle Hooks **/
  ngOnInit(): void {
    this.onGetInitialHeroes();
    this.getAllHeroes();
    this.selectedHero.set(this.heroes()[0]);
  }

  /** Methods **/
  onGetInitialHeroes(): void {
    // Id 9 is not available in the API
    for (let id = 1; id <= 8; id++) {
      this.heroesService.getHeroById(id).subscribe((hero) => {
        this.currentHeroes.update(() => [...this.currentHeroes(), hero]);
      });
    }
    for (let id = 10; id <= 11; id++) {
      this.heroesService.getHeroById(id).subscribe((hero) => {
        this.currentHeroes.update(() => [...this.currentHeroes(), hero]);
      });
    }
  }
  getAllHeroes(): void {
    this.heroesService.getAllHeroes().subscribe((heroes) => {
      this.heroes.set(heroes);
      if (this.isBrowser) {
        console.log('Heroes:', this.heroes());
      }
    });
  }
  onBannerClick(id: number): void {
    this.selectedHero.set(this.heroes().find((hero) => hero.id === id) || null);
  }
  onShowMore(): void {
    this.currentHeroes.update(() => [
      ...this.currentHeroes(),
      ...this.heroes().slice(this.currentHeroes().length, this.currentHeroes().length + 10),
    ]);
  }
}
