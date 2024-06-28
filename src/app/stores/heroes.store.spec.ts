import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroesStore } from './heroes.store';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import { mockFetchHeroesResponse } from './heroes.mocks';

describe('HeroesStore', () => {
  let store: HeroesStore;
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesStore, provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(HeroesStore);
    service = TestBed.inject(HeroesService);
  });

  /** Actions **/
  it('should fetch the heroes list', () => {
    jest
      .spyOn(service, 'fetchHeroes')
      .mockReturnValue(of(mockFetchHeroesResponse));
    store.getHeroes();
    expect(store.heroes()).toEqual(mockFetchHeroesResponse);
  });
});
