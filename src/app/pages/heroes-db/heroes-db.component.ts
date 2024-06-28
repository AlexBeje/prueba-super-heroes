import {
  Component,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import type { Hero } from '../../types/heroes.model';
import { HeroesStore } from '../../stores/heroes.store';
import { CardComponent } from '../../components/card/card.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from '../../components/form/form.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-heroes-db',
  standalone: true,
  templateUrl: './heroes-db.component.html',
  imports: [
    CardComponent,
    BannerComponent,
    MatButtonModule,
    FormComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatProgressSpinnerModule,
  ],
})
export class HeroesDbComponent implements OnInit {
  /** Injectables **/
  dialog = inject(MatDialog);

  /** Variables **/
  heroesStore = inject(HeroesStore);
  isBrowser = inject(PLATFORM_ID) === 'browser';
  isServer = inject(PLATFORM_ID) === 'server';
  snackBarRef: MatSnackBar = inject(MatSnackBar);

  /** Signals **/
  currentMyHeroes = signal<Hero[] | null>(null);
  currentHeroes = signal<Hero[] | null>(null);
  selectedHero = signal<Hero | null>(null);
  previousSelectedHero = signal<number | null>(null);
  addMode = signal<boolean>(false);
  editMode = signal<boolean>(false);
  lastId = signal<number>(0);

  /** Computed **/
  heroes = computed(() => this.heroesStore.heroes());
  myHeroes = computed(() => this.heroesStore.myHeroes());
  filteredHeroes = computed(() => this.heroesStore.filteredHeroes());
  filteredMyHeroes = computed(() => this.heroesStore.filteredMyHeroes());

  /** Lifecycle Hooks **/
  ngOnInit(): void {
    this.heroesStore.getHeroes();
    this.heroesStore.getMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.currentHeroes.set(this.heroes());
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
    this.openDeleteDialog(hero);
  }
  openDeleteDialog(hero: Hero): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDeleteFormItem(hero);
      }
    });
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
    this.heroesStore.setFilterByValue('');
    this.heroesStore.filterHeroes();
    this.heroesStore.addHero(hero);
    this.heroesStore.getMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.setMode('default');
    this.setSelectedHero(hero.id);
    this.snackBarRef.open('New hero added!', undefined, {
      duration: 3000,
    });
  }
  onEditFormItem(hero: Hero): void {
    this.heroesStore.setFilterByValue('');
    this.heroesStore.filterHeroes();
    this.heroesStore.editHero(hero);
    this.heroesStore.getMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.setMode('default');
    this.setSelectedHero(hero.id);
    this.snackBarRef.open('Hero edited successfully!', undefined, {
      duration: 3000,
    });
  }
  onDeleteFormItem(hero: Hero): void {
    this.heroesStore.setFilterByValue('');
    this.heroesStore.filterHeroes();
    this.heroesStore.deleteHero(hero);
    this.heroesStore.getMyHeroes();
    this.currentMyHeroes.set(this.myHeroes());
    this.setMode('default');
    if (this.previousSelectedHero() === hero.id) {
      this.setSelectedHero(1);
    } else {
      this.setSelectedHero(this.previousSelectedHero());
    }
    this.snackBarRef.open('Hero deleted correctly!', undefined, {
      duration: 3000,
    });
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'heroes-db-confirm-dialog.html',
  styleUrl: 'heroes-db-confirm-dialog.scss',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
