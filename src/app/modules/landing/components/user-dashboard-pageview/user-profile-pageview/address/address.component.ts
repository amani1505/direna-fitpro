import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AddressService } from '@service/modules/address.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddressCardComponent } from './address-card/address-card.component';
import { CreateAddressComponent } from './create-address/create-address.component';

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
  loading = this._addressService.loading;

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
