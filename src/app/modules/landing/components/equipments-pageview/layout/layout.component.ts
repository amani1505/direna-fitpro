import { Component } from '@angular/core';
import { EquipmentsComponent } from '../components/equipments/equipments.component';

@Component({
  selector: 'equipment-layout',
  standalone: true,
  imports: [EquipmentsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
