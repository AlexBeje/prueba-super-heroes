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
  id = input<number>(0);
  title = input<string>('');
  image = input<string>('');
  selected = input<boolean>(false);
  editMode = input<boolean>(false);

  /** Outputs **/
  bannerClick = output<number>();
  editClick = output<number>();

  /** Methods **/
  onBannerClick(): void {
    this.bannerClick.emit(this.id());
  }
  onEdit(event: MouseEvent): void {
    event.stopPropagation();
    this.editClick.emit(this.id());
  }
}
