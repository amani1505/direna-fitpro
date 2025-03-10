import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { EquipmentsHeaderComponent } from '../equipments-header/equipments-header.component';
import { EquipmentsCardComponent } from '../equipments-card/equipments-card.component';
import { Equipment } from '@model/equipment';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '@components/paginations/pagination/pagination.component';

@Component({
  selector: 'equipments',
  standalone: true,
  imports: [
    EquipmentsHeaderComponent,
    EquipmentsCardComponent,
    PaginationComponent,
  ],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {
  @Input({ required: true }) data: Equipment[] = [];
  @Input({ required: true }) isLoading: boolean = false;
  @Input({ required: true }) totalPages =1
  @Input({ required: true }) currentPage = 1
  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  view(id: any) {
    this._router.navigate([id], { relativeTo: this._route });
  }
  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
}
