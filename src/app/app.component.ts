import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesDbComponent } from './heroes-db/heroes-db.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroesDbComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Superheroes DB';
}
