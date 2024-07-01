import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroesStore } from './heroes.store';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import * as heroesStoreMocks from './heroes.mocks';
import { Hero } from '../types/heroes.model';
import * as _ from 'lodash';

describe('HeroesStore', () => {
  /** Variables **/
  let store: HeroesStore;
  let service: HeroesService;

  /** beforeEach() Method **/
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesStore, provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(HeroesStore);
    service = TestBed.inject(HeroesService);
  });

  /** getHeroes() Method **/
  it('should fetch the heroes list', () => {
    jest
      .spyOn(service, 'fetchHeroes')
      .mockReturnValue(of(heroesStoreMocks.mockFetchHeroesResponse));
    store.getHeroes();
    expect(store.heroes()).toEqual(heroesStoreMocks.mockFetchHeroesResponse);
  });

  /** getMyHeroes() Method **/
  it('should fetch the my heroes list', () => {
    jest
      .spyOn(service, 'fetchMyHeroes')
      .mockReturnValue(_.cloneDeep(heroesStoreMocks.mockFetchMyHeroesResponse));
    store.getMyHeroes();
    expect(store.myHeroes()).toEqual(
      heroesStoreMocks.mockFetchMyHeroesResponse,
    );
  });

  /** addHero() Method **/
  it('should add a hero to my heroes list', () => {
    jest
      .spyOn(service, 'fetchMyHeroes')
      .mockReturnValue(_.cloneDeep(heroesStoreMocks.mockFetchMyHeroesResponse));
    const newHero = heroesStoreMocks.mockAddHero;
    store.getMyHeroes();
    store.addHero(newHero);
    expect(store.myHeroes()).toEqual([
      ...heroesStoreMocks.mockFetchMyHeroesResponse,
      newHero,
    ]);
  });

  /** editHero() Method **/
  it('should edit a hero from my heroes list', () => {
    jest
      .spyOn(service, 'fetchMyHeroes')
      .mockReturnValue(_.cloneDeep(heroesStoreMocks.mockFetchMyHeroesResponse));
    store.getMyHeroes();
    expect(store.myHeroes().find((hero) => hero.id === 4)?.name).toEqual(
      'Spider-Man',
    );
    const editedHero = store.myHeroes().find((hero) => hero.id === 4) as Hero;
    editedHero.name = 'Spider-Woman';
    store.editHero(editedHero);
    expect(store.myHeroes().find((hero) => hero.id === 4)?.name).toEqual(
      'Spider-Woman',
    );
  });

  /** deleteHero() Method **/
  it('should delete a hero from my heroes list', () => {
    jest
      .spyOn(service, 'fetchMyHeroes')
      .mockReturnValue(_.cloneDeep(heroesStoreMocks.mockFetchMyHeroesResponse));
    store.getMyHeroes();
    const heroToBeDeleted = store
      .myHeroes()
      .find((hero) => hero.id === 4) as Hero;
    expect(store.myHeroes().length).toBe(2);
    store.deleteHero(heroToBeDeleted);
    expect(store.myHeroes().find((hero) => hero.id === 4)).toBeUndefined();
    expect(store.myHeroes().length).toBe(1);
  });

  /** setFilterByValue() Method **/
  it('should set the filterBy value', () => {
    store.setFilterByValue('spider');
    expect(store.filterBy()).toBe('spider');
  });

  /** filterHeroes() Method **/
  it('should filter the heroes list based on the filterBy value', () => {
    jest
      .spyOn(service, 'fetchMyHeroes')
      .mockReturnValue(_.cloneDeep(heroesStoreMocks.mockFetchMyHeroesResponse));
    jest
      .spyOn(service, 'fetchHeroes')
      .mockReturnValue(of(heroesStoreMocks.mockFetchHeroesResponse));
    store.getMyHeroes();
    store.getHeroes();
    expect(store.myHeroes().length).toBe(2);
    expect(store.heroes().length).toBe(3);
    store.setFilterByValue('bomb');
    store.filterHeroes();
    expect(store.filteredMyHeroes()?.length).toBe(0);
    expect(store.filteredHeroes()?.length).toBe(1);
    expect(store.filteredHeroes()?.map((hero) => hero.name)).toContain(
      'A-Bomb',
    );
  });
  it('should set the filtered heroes lists value to null when filterBy value is empty', () => {
    jest
      .spyOn(service, 'fetchMyHeroes')
      .mockReturnValue(_.cloneDeep(heroesStoreMocks.mockFetchMyHeroesResponse));
    jest
      .spyOn(service, 'fetchHeroes')
      .mockReturnValue(of(heroesStoreMocks.mockFetchHeroesResponse));
    store.getMyHeroes();
    store.getHeroes();
    expect(store.myHeroes().length).toBe(2);
    expect(store.heroes().length).toBe(3);
    store.setFilterByValue('');
    store.filterHeroes();
    expect(store.filteredMyHeroes()).toBe(null);
    expect(store.filteredHeroes()).toBe(null);
  });
});
