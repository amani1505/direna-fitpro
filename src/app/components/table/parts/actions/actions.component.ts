import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableActions } from '../../../../models/TableColumn.interface';
import { NormalSelectComponent } from '@components/select/normal-select/normal-select.component';

@Component({
  selector: 'TableActions',
  imports: [AngularSvgIconModule, NormalSelectComponent],
  templateUrl: './actions.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  @Input() actions: Array<TableActions> = [];
}
