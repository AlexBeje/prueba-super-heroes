import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { provideHttpClient } from '@angular/common/http';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
      { teardown: { destroyAfterEach: false } }, // 👈
    );
    TestBed.configureTestingModule({
      providers: [
        HeroesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should fetch data from the API', () => {
  //   service.fetchHeroes();
  //   const req = httpMock.expectOne(
  //     'https://akabab.github.io/superhero-api/api/all.json',
  //   );
  //   expect(req.request.method).toBe('GET');
  // });
});
