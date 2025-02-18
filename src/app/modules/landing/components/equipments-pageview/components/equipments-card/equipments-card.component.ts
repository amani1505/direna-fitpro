import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'equipment-card',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './equipments-card.component.html',
  styleUrl: './equipments-card.component.scss',
})
export class EquipmentsCardComponent {
  @Input() defaultImage!: string;
  @Input() hoverImage!: string;
  @Input() badgeText!: string;
  @Input() badgeColor: string = 'var(--ocean-green)';
  @Input() category!: string;
  @Input() title!: string;
  @Input() price!: string;
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
