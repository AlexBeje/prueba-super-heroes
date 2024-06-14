import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../types/heroes.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './form.component.html',
})
export class FormComponent {
  /** Inputs **/
  lastId = input.required<number>();

  /** Outputs **/
  close = output();
  add = output<Hero>();

  /** Form Controls **/
  name = new FormControl('', [Validators.required]);
  fullName = new FormControl('', [Validators.required]);
  imageUrl = new FormControl('', [Validators.required]);
  power = new FormControl('', [Validators.required]);
  speed = new FormControl('', [Validators.required]);
  alignment = new FormControl('', [Validators.required]);
  alias = new FormControl('');
  firstAppearance = new FormControl('');

  /** Signals **/
  errorMessage = signal('');
  onAddClick = signal(false);
  id = signal<number>(0);
  alignments = signal([
    { value: 'good', viewValue: 'Good' },
    { value: 'bad', viewValue: 'Bad' },
  ]);

  /** Lifecycle Hooks **/
  ngOnInit(): void {
    this.id.set(this.lastId() + 1);
  }

  /** Methods **/
  onClose(): void {
    this.close.emit();
  }
  validate() {
    if (
      this.name.hasError('required') ||
      this.fullName.hasError('required') ||
      this.imageUrl.hasError('required') ||
      this.power.hasError('required') ||
      this.speed.hasError('required') ||
      this.alignment.hasError('required')
    ) {
      if (this.onAddClick()) {
        this.name.markAsTouched();
        this.fullName.markAsTouched();
        this.imageUrl.markAsTouched();
        this.power.markAsTouched();
        this.speed.markAsTouched();
        this.alignment.markAsTouched();
      }
      this.errorMessage.set('Value required');
    } else {
      this.errorMessage.set('');
    }
  }
  onAdd() {
    this.onAddClick.set(true);
    this.validate();
    if (
      this.errorMessage() === '' &&
      this.id() &&
      this.name.value &&
      this.fullName.value &&
      this.imageUrl.value &&
      this.power.value &&
      this.speed.value
    ) {
      this.add.emit({
        id: this.id(),
        name: this.name.value,
        images: { lg: this.imageUrl.value },
        powerstats: { power: +this.power.value, speed: +this.speed.value },
        biography: {
          fullName: this.fullName.value,
          aliases: [this.alias.value || ''],
          firstAppearance: this.firstAppearance.value || '',
          alignment: this.alignment.value || '',
        },
      });
    }
  }
}
