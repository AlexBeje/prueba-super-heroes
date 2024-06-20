import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  /** Inputs **/
  id = input<number>(1);
  title = input<string>('');
  image = input<string>('');
  selected = input<boolean>(false);
  editMode = input<boolean>(false);

  /** Outputs **/
  click = output<number>();
  edit = output<number>();
  delete = output<number>();

  /** Methods **/
  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit(this.id());
  }
  onEdit(event: MouseEvent): void {
    event.stopPropagation();
    this.edit.emit(this.id());
  }
  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.id());
  }
}
