import { Component, output, signal } from '@angular/core';
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

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
})
export class FormComponent {
  /** Outputs **/
  close = output();

  /** Form Controls **/
  name = new FormControl('', [Validators.required]);
  imageUrl = new FormControl('', [Validators.required]);
  power = new FormControl('', [Validators.required]);
  speed = new FormControl('', [Validators.required]);
  alias = new FormControl('');
  firstAppearance = new FormControl('');

  /** Signals **/
  errorMessage = signal('');

  /** Methods **/
  onClose(): void {
    this.close.emit();
  }
  updateErrorMessage() {
    if (
      this.name.hasError('required') ||
      this.imageUrl.hasError('required') ||
      this.power.hasError('required') ||
      this.speed.hasError('required')
    ) {
      this.errorMessage.set('Value required');
    } else {
      this.errorMessage.set('');
    }
  }
}
