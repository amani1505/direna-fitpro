import { Component, computed, inject } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LayoutComponent } from './layout/layout.component';
import { SearchDropdownComponent } from '@components/search-dropdown/search-dropdown.component';
import { EquipmentService } from '@service/modules/equipment.service';

@Component({
  selector: 'equipments-pageview',
  standalone: true,
  imports: [AngularSvgIconModule, LayoutComponent, SearchDropdownComponent],
  templateUrl: './equipments-pageview.component.html',
  styleUrl: './equipments-pageview.component.scss',
})
export class EquipmentsPageviewComponent {
  private _equipmentsService = inject(EquipmentService);

  equipemnts = computed(() => this._equipmentsService.equipments()?.data || []);
  loading = this._equipmentsService.loading;

  onSearch(query: string): void {
    this._equipmentsService.findAll({
      filterBy: 'title',
      search: query,
      relations: ['files'],
    });
  }
}
