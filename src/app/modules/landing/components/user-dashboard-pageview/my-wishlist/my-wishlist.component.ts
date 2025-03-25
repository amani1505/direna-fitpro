import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WishlistCardComponent } from "./wishlist-card/wishlist-card.component";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}
@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [ WishlistCardComponent],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.scss',
})
export class MyWishlistComponent {
  wishlists: WishlistItem[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://picsum.photos/400/300?random=1',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://picsum.photos/400/300?random=2',
    },
    {
      id: 3,
      name: 'Laptop Stand',
      price: 49.99,
      image: 'https://picsum.photos/400/300?random=3',
    },
  ];
}
