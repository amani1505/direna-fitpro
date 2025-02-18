import { Component } from '@angular/core';
import { EquipmentsPageviewComponent } from '@modules/landing/components/equipments-pageview/equipments-pageview.component';


@Component({
  selector: 'app-equipments',
  standalone: true,
  imports: [EquipmentsPageviewComponent],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss'
})
export class EquipmentsComponent {

}
