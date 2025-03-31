import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'dashboard-equipment',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './dashboard-equipment.component.html',
  styleUrl: './dashboard-equipment.component.scss'
})
export class DashboardEquipmentComponent {
  order = {
    name: 'Cardion Bycicle',
    model_no: 'MMMEMER',
    images: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
    ],
    quantity: '10',
    price: '$129.00',
  };
}
