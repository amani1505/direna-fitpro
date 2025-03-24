import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface Address {
  id: number;
  type: string;
  name: string;
  street: string;
  apt?: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

@Component({
  selector: 'personal-address',
  standalone: true,
  imports: [NgIf, AngularSvgIconModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  addresses: Address[] = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      street: '123 Main Street',
      apt: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      street: '456 Business Ave',
      suite: 'Suite 200',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States',
      isDefault: false,
    },
  ];

  setDefaultAddress(id: number): void {
    this.addresses = this.addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));
    console.log('Set default address:', id);
  }

  addNewAddress(): void {
    console.log('Adding new address');
    // Implement add functionality
  }

  editAddress(id: number): void {
    console.log('Editing address:', id);
    // Implement edit functionality
  }

  deleteAddress(id: number): void {
    console.log('Deleting address:', id);
    // Implement delete functionality
  }
}
