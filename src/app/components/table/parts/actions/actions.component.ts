import { Component } from '@angular/core';
import { TableFilterService } from '@components/table/service/filter.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'TableActions',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  constructor(public filterService: TableFilterService) {}

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
    this.filterService.searchField.set(input.value);
  }

  onStatusChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.filterService.statusField.set(selectElement.value);
  }

  onOrderChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.filterService.orderField.set(selectElement.value);
  }
}
