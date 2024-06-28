import { TestBed, fakeAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroesStore } from './heroes.store';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HeroesService } from '../services/heroes.service';

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

  it('should fetch the heroes list', () => {
    const mockData = [
      {
        id: 1,
        name: 'A-Bomb',
        slug: '1-a-bomb',
        powerstats: {
          intelligence: 38,
          strength: 100,
          speed: 17,
          durability: 80,
          power: 24,
          combat: 64,
        },
        appearance: {
          gender: 'Male',
          race: 'Human',
          height: ["6'8", '203 cm'],
          weight: ['980 lb', '441 kg'],
          eyeColor: 'Yellow',
          hairColor: 'No Hair',
        },
        biography: {
          fullName: 'Richard Milhouse Jones',
          alterEgos: 'No alter egos found.',
          aliases: ['Rick Jones'],
          placeOfBirth: 'Scarsdale, Arizona',
          firstAppearance: 'Hulk Vol 2 #2 (April, 2008) (as A-Bomb)',
          publisher: 'Marvel Comics',
          alignment: 'good',
        },
        work: {
          occupation: 'Musician, adventurer, author; formerly talk show host',
          base: '-',
        },
        connections: {
          groupAffiliation:
            'Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom',
          relatives:
            'Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)',
        },
        images: {
          xs: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg',
          sm: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg',
          md: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg',
          lg: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg',
        },
      },
    ];
    jest.spyOn(service, 'fetchHeroes').mockReturnValue(of(mockData));
    store.getHeroes();
    expect(store.heroes()).toEqual(mockData);
  });
});
