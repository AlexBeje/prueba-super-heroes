import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import type { Hero } from '../types/heroes.model';
import { HeroesService } from '../services/heroes.service';
import { CardComponent } from '../card/card.component';
import { BannerComponent } from '../banner/banner.component';
import { MatButton } from '@angular/material/button';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-heroes-db',
  standalone: true,
  templateUrl: './heroes-db.component.html',
  imports: [CardComponent, BannerComponent, MatButton, FormComponent],
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
  addMode = signal<boolean>(false);
  editMode = signal<boolean>(false);
  myHeroes = signal<Hero[]>([
    {
      id: 732,
      name: 'Spider-Man',
      images: {
        lg: 'https://variety.com/wp-content/uploads/2023/05/spider-2.jpg',
      },
      powerstats: {
        power: 43,
        speed: 87,
      },
      biography: {
        fullName: 'Peter Parker',
        aliases: ['Spidey'],
        firstAppearance: 'Spider-Man #1',
        alignment: 'good',
      },
    },
  ]);
  lastId = signal<number>(0);

  /** Lifecycle Hooks **/
  ngOnInit(): void {
    this.getInitialHeroes();
    this.getAllHeroes();
    this.selectedHero.set(this.heroes()[0]);
    if (!this.myHeroes().length) {
      this.lastId.set(
        (this.heroes().length && this.heroes()[this.heroes().length - 1].id) ||
          0,
      );
    } else {
      this.lastId.set(
        (this.myHeroes().length &&
          this.myHeroes()[this.myHeroes().length - 1].id) ||
          0,
      );
    }
  }

  /** Methods **/
  getInitialHeroes(): void {
    for (let id = 1; id <= 11; id++) {
      // Id 9 is not available in the API
      if (id === 9) return;
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
    this.setMode('default');
    this.selectedHero.set(
      this.heroes().find((hero) => hero.id === id) ||
        this.myHeroes().find((hero) => hero.id === id) ||
        null,
    );
  }
  onShowMore(): void {
    this.currentHeroes.update(() => [
      ...this.currentHeroes(),
      ...this.heroes().slice(
        this.currentHeroes().length,
        this.currentHeroes().length + 10,
      ),
    ]);
  }
  onAddHero(): void {
    this.setMode('add');
    this.selectedHero.set(null);
  }
  onEditHero(id: number): void {
    this.setMode('edit');
    this.selectedHero.set(
      this.myHeroes().find((hero) => hero.id === id) || null,
    );
  }
  onDeleteHero(id: number): void {
    this.setMode('default');
    this.selectedHero.set(this.heroes()[0]);
    this.myHeroes.update(() =>
      this.myHeroes().filter((hero) => hero.id !== id),
    );
  }
  onCloseForm(): void {
    this.setMode('default');
    this.selectedHero.set(this.heroes()[0]);
  }
  onAddForm(hero: Hero): void {
    this.myHeroes.update(() => [...this.myHeroes(), hero]);
  }
  onEditForm(hero: Hero): void {
    this.myHeroes.update(() =>
      this.myHeroes().map((h) => (h.id === hero.id ? hero : h)),
    );
  }
  setMode(mode: 'default' | 'add' | 'edit'): void {
    switch (mode) {
      case 'add':
        this.addMode.set(true);
        this.editMode.set(false);
        break;
      case 'edit':
        this.addMode.set(false);
        this.editMode.set(true);
        break;
      default:
        this.addMode.set(false);
        this.editMode.set(false);
        break;
    }
  }
}
