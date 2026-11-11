import { Component, inject, Input, signal } from '@angular/core';
import { Address } from '@model/address.interface';
import { AddressService } from '@service/modules/address.service';
import { UpdateAddressComponent } from "../update-address/update-address.component";
import { ModalComponent } from '@components/modal/modal.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'address-card',
  standalone: true,
  imports: [UpdateAddressComponent, ModalComponent, AngularSvgIconModule],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent {
  @Input({ required: true }) address: Address;

  private _addressService = inject(AddressService);

    deleteContent = 'This address will be removed from your account.';
    deleteSubContent = "This can't be undone. Orders already placed aren't affected.";

    isDeleteModalOpen = signal<boolean>(false);
    isModalOpen = signal<boolean>(false);

    addressId = signal<string>('');



  setDefaultAddress(id: string): void {
    this._addressService.setDefault(id, { is_default: true });
  }

  openDeleteModal() {
    this.isDeleteModalOpen.set(true);
  }

  delete() {
    this._addressService.delete(this.address?.id);
    this.isDeleteModalOpen.set(false);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
  }
  openEditModal(id: string) {
    this.addressId.set(id);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
