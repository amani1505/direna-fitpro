import { Component } from '@angular/core';
import { CartPageviewComponent } from '@modules/landing/components/equipments-pageview/cart-pageview/cart-pageview.component';

@Component({
    selector: 'app-cart',
    imports: [CartPageviewComponent],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {}
