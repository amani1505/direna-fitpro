import { Component, Input } from '@angular/core';
import { Order } from '@model/order.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: '[orders-table-row]',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './orders-table-row.component.html',
  styleUrl: './orders-table-row.component.scss',
})
export class OrdersTableRowComponent {
  @Input() order: Order
  fileUrl = environment.staicUrl;


}
