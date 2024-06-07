import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';
import { HeroesService } from './services/heroes.service';
import { Hero } from './types/heroes.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HeroesService],
})
export class AppComponent implements OnInit {
  title = 'Superheroes';
  heroesService = inject(HeroesService);

  httpClient = inject(HttpClient);
  heroes: Hero[] = [];


  ngOnInit(): void {
    this.heroesService.getAllHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      // console.log('🧣', this.heroes);
    });
  }
}
