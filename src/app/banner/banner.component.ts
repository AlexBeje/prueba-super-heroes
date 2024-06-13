import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  /** Inputs **/
  id = input<number>(0);
  title = input<string>('');
  image = input<string>('');
  selected = input<boolean>(false);

  /** Outputs **/
  bannerClick = output<number>();

  onBannerClick(): void {
    this.bannerClick.emit(this.id());
  }
}
 