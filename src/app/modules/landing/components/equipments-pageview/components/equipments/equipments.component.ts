import { Component, inject, Input } from '@angular/core';
import { EquipmentsHeaderComponent } from '../equipments-header/equipments-header.component';
import { EquipmentsCardComponent } from '../equipments-card/equipments-card.component';
import { Equipment } from '@model/equipment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'equipments',
  standalone: true,
  imports: [EquipmentsHeaderComponent, EquipmentsCardComponent],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {
  @Input({ required: true }) data: Equipment[] = [];
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  view(id: any) {
    this._router.navigate([id], { relativeTo: this._route });
  }
}
