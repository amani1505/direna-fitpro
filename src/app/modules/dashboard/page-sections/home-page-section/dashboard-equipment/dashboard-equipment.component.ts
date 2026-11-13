import {
  Component,
  inject,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Equipment } from '@model/equipment';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: 'dashboard-equipment',
  imports: [AngularSvgIconModule, RouterModule],
  templateUrl: './dashboard-equipment.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-equipment.component.scss',
})
export class DashboardEquipmentComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  @Input() equipments: Equipment[] = [];
  fileUrl = environment.staicUrl;

  view(id: string) {
    this._router.navigate([`equipments/${id}`], { relativeTo: this._route });
  }
}
