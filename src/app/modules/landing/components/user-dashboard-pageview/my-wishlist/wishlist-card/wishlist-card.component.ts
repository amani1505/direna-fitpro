import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'wishlist-card',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.scss',
})
export class WishlistCardComponent {
  @Input() wishlist: any = {};
}
