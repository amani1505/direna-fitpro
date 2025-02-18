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

  @Output() heartClicked = new EventEmitter<void>();
  @Output() eyeClicked = new EventEmitter<void>();
  @Output() bagClicked = new EventEmitter<void>();

  onHeartClick() {
    this.heartClicked.emit();
  }

  onEyeClick() {
    this.eyeClicked.emit();
  }

  onBagClick() {
    this.bagClicked.emit();
  }
}
