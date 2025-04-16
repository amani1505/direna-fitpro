import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '@model/order.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: 'orders-card',
  standalone: true,
  imports: [NgClass, AngularSvgIconModule,DatePipe],
  templateUrl: './orders-card.component.html',
  styleUrl: './orders-card.component.scss',
})
export class OrdersCardComponent {
  @Input() order: Order
  fileUrl = environment.staicUrl;
}
