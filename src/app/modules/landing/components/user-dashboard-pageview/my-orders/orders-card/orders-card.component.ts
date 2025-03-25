import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'orders-card',
  standalone: true,
  imports: [NgClass, AngularSvgIconModule],
  templateUrl: './orders-card.component.html',
  styleUrl: './orders-card.component.scss',
})
export class OrdersCardComponent {
  order = {
    id: '#ORD-5288',
    date: 'June 10, 2023',
    images: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80',
    ],
    amount: '$129.00',
    status: 'Processing',
  };
}
