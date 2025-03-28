import { NgIf } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { Address } from '@model/address.interface';
import { AddressService } from '@service/modules/address.service';
import { UpdateAddressComponent } from "../update-address/update-address.component";
import { ModalComponent } from '@components/modal/modal.component';

@Component({
  selector: 'address-card',
  standalone: true,
  imports: [NgIf, UpdateAddressComponent,ModalComponent],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent {
  @Input({ required: true }) address: Address;

  private _addressService = inject(AddressService);

    deleteContent: string = 'Are you sure you want to delete this Address?';
    deleteSubContent: string =
      'Deleting this Address  will permanently remove this address from your addresses list';

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
