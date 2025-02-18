import { Component, Input } from '@angular/core';
import { EquipmentsHeaderComponent } from '../equipments-header/equipments-header.component';
import { EquipmentsCardComponent } from '../equipments-card/equipments-card.component';
import { Equipment } from '@model/equipment';

@Component({
  selector: 'equipments',
  standalone: true,
  imports: [EquipmentsHeaderComponent,EquipmentsCardComponent],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss'
})
export class EquipmentsComponent {
@Input({required: true}) data:Equipment[]=[]

}
