import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesDbComponent } from './heroes-db.component';

describe('HeroesDbComponent', () => {
  let component: HeroesDbComponent;
  let fixture: ComponentFixture<HeroesDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
