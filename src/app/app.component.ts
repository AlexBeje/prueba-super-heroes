import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesDbComponent } from './pages/heroes-db/heroes-db.component';
import { SearcherComponent } from "./components/searcher/searcher.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [RouterOutlet, HeroesDbComponent, SearcherComponent]
})
export class AppComponent {
    title = 'Superheroes DB';
}
