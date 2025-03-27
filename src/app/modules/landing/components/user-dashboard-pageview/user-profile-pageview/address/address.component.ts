import { NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CreateAddressComponent } from './create-address/create-address.component';
import { AddressService } from '@service/modules/address.service';
import { AddressCardComponent } from './address-card/address-card.component';

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
  imports: [AngularSvgIconModule, CreateAddressComponent, AddressCardComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  private _addressService = inject(AddressService);

  isModalOpen = signal<boolean>(false);
  addresses = computed(() => this._addressService.addresses() || []);
  ngOnInit(): void {
    this._addressService.findAll();
  }



  addNewAddress(): void {
    this.isModalOpen.set(true);
  }


  closeModal() {
    this.isModalOpen.set(false);
  }
}
