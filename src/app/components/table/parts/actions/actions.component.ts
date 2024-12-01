import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableActions } from '../../../../models/TableColumn.interface';
import { NormalSelectComponent } from '@components/select/normal-select/normal-select.component';

@Component({
  selector: 'TableActions',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, NormalSelectComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  @Input() actions: Array<TableActions> = [];
}
