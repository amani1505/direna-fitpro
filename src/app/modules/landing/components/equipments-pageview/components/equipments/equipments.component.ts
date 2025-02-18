import { Component } from '@angular/core';
import { EquipmentsHeaderComponent } from '../equipments-header/equipments-header.component';
import { EquipmentsCardComponent } from '../equipments-card/equipments-card.component';

@Component({
  selector: 'equipments',
  standalone: true,
  imports: [EquipmentsHeaderComponent,EquipmentsCardComponent],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss'
})
export class EquipmentsComponent {

}
