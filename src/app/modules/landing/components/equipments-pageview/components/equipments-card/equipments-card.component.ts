import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipment } from '@model/equipment';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
    selector: 'equipment-card',
    imports: [AngularSvgIconModule, DecimalPipe, RouterLink],
    templateUrl: './equipments-card.component.html',
    styleUrl: './equipments-card.component.scss'
})
export class EquipmentsCardComponent implements OnChanges {
  @Input({ required: true }) equipment!: Equipment;
  @Input() inWishlist = false;

  @Output() addToWishlist = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<string>();

  fileUrl = environment.staicUrl;
  images: string[] = [];
  category = '';
  soldOut = false;

  ngOnChanges(): void {
    this.images = (this.equipment?.files ?? []).map((f) => f.file_path).filter(Boolean).slice(0, 2);
    this.category = this.equipment?.categories?.[0]?.category_name ?? '';
    this.soldOut = this.equipment?.quantity === 0;
  }

  onAddToCart(id: string) {
    this.addToCart.emit(id);
  }

  onAddToWishlist(id: string) {
    this.addToWishlist.emit(id);
  }
}
