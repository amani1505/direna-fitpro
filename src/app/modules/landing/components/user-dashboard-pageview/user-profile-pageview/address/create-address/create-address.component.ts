import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableModalComponent } from '@components/modal/reusable-modal/reusable-modal.component';
import { ModalConfig } from '@model/modal-config.interface';
import { AddressService } from '@service/modules/address.service';
import { ToastService } from '@service/toast.service';

@Component({
  selector: 'create-address',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ReusableModalComponent, NgClass],
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.scss',
})
export class CreateAddressComponent {
  isModalOpen = input.required<boolean>();

  @Output() cancel = new EventEmitter<any>();

  private _addressService = inject(AddressService);
  private _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);
  loading = this._addressService.loading;

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'xl',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };

  addressForm = this._formBuilder.group({
    city: ['', Validators.required],
    country: ['', Validators.required],
    street: ['', Validators.required],
    zip_code: [''],
    state: [''],
    district: ['', Validators.required],
    type: ['', Validators.required],
    is_default: [false],
  });

  submit() {
    if (this.addressForm.invalid) {
      return;
    }

    this._addressService.create(this.addressForm.value).subscribe({
      next: () => {
        this.addressForm.reset();
        this.cancel.emit(); // Only close on success
      },
      error: (error) => {
        this._toastService.error(error.error.message);
      },
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
