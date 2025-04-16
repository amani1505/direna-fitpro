import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Equipment } from '@model/equipment';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: 'equipment-card',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './equipments-card.component.html',
  styleUrl: './equipments-card.component.scss',
})
export class EquipmentsCardComponent {
  @Input({ required: true }) equipment!: Equipment;
  fileUrl = environment.staicUrl;

  @Input() image!: string;
  @Input() showHeart: boolean = false;
  @Input() showEye: boolean = false;
  @Input() showBag: boolean = false;
  @Input() badgeText!: string;
  @Input() badgeColor: string = 'var(--ocean-green)';
  @Input() oldPrice!: string;
  @Input() showRating: boolean = false;
  @Input() rating: number = 0;

  @Output() addToWishlist = new EventEmitter<string>();
  @Output() singleView = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<string>();

  viewSingle(id: string) {
    this.singleView.emit(id);
  }

  onAddToCart(id: string) {
    this.addToCart.emit(id);
  }

  onAddToWishlist(id: string) {
    this.addToWishlist.emit(id);
  }
}
