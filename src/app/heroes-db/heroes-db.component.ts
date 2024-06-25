import {
  Component,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
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
  currentMyHeroes = signal<Hero[] | null>(null);
  currentHeroes = signal<Hero[] | null>(null);
  selectedHero = signal<Hero | null>(null);
  previousSelectedHero = signal<number | null>(null);
  addMode = signal<boolean>(false);
  editMode = signal<boolean>(false);
  lastId = signal<number>(0);

  /** Computed **/
  heroes = computed(() => this.heroesService.heroes());
  myHeroes = computed(() => this.heroesService.myHeroes());
  filteredHeroes = computed(() => this.heroesService.filteredHeroes());
  filteredMyHeroes = computed(() => this.heroesService.filteredMyHeroes());

  /** Lifecycle Hooks **/
  ngOnInit(): void {
    this.heroesService.fetchHeroes();
    this.heroesService.fetchMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.currentHeroes.set(this.heroes().slice(0, 10));
    this.setSelectedHero(1);
    this.setLastId();
  }

  /** Methods **/
  onAddNewClick(): void {
    this.setMode('add');
    this.setLastId();
    this.setSelectedHero(null);
  }
  onBannerClick(id: number): void {
    this.setMode('default');
    this.setSelectedHero(id);
  }
  onBannerEditClick(id: number): void {
    this.setMode('edit');
    this.setSelectedHero(id);
  }
  onBannerDeleteClick(id: number): void {
    const hero = this.myHeroes().find((hero) => hero.id === id) as Hero;
    this.onDeleteFormItem(hero);
  }
  onShowMoreClick(): void {
    this.currentHeroes.update((heroes) => {
      if (heroes === null) {
        return heroes;
      }
      return [
        ...heroes,
        ...this.heroes().slice(heroes.length, heroes.length + 10),
      ];
    });
  }
  onCloseForm(): void {
    this.setMode('default');
    if (this.previousSelectedHero() !== null) {
      this.setSelectedHero(this.previousSelectedHero());
    } else {
      this.setSelectedHero(1);
    }
  }
  onAddFormItem(hero: Hero): void {
    this.heroesService.addHero(hero);
    this.heroesService.fetchMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.setMode('default');
    this.setSelectedHero(hero.id);
  }
  onEditFormItem(hero: Hero): void {
    this.heroesService.editHero(hero);
    this.heroesService.fetchMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.setMode('default');
    this.setSelectedHero(hero.id);
  }
  onDeleteFormItem(hero: Hero): void {
    this.heroesService.deleteHero(hero);
    this.heroesService.fetchMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.setMode('default');
    if (this.previousSelectedHero() === hero.id) {
      this.setSelectedHero(1);
    } else {
      this.setSelectedHero(this.previousSelectedHero());
    }
  }
  setSelectedHero(id: number | null): void {
    if (id === null) {
      this.selectedHero.set(null);
      return;
    }
    this.previousSelectedHero.set(id);
    const heroExists = this.myHeroes().find((hero) => hero.id === id);
    const myHeroExists = this.heroes().find((hero) => hero.id === id);
    if (heroExists) {
      this.selectedHero.set(heroExists);
    } else if (myHeroExists) {
      this.selectedHero.set(myHeroExists);
    }
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
  setLastId(): void {
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
}
