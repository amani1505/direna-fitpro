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
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'create-address',
    imports: [FormsModule, ReactiveFormsModule, ReusableModalComponent, NgClass, AngularSvgIconModule],
    templateUrl: './create-address.component.html',
    styleUrl: './create-address.component.scss'
})
export class CreateAddressComponent {
  isModalOpen = input.required<boolean>();

  @Output() cancel = new EventEmitter<any>();

  private _addressService = inject(AddressService);
  private _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);
  loading = this._addressService.loading;

  modalConfig: ModalConfig = {
    title: 'Add address',
    size: 'lg',
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

  readonly presets = ['Home', 'Work', 'Gym'];

  pickType(type: string): void {
    this.addressForm.get('type')?.setValue(type);
    this.addressForm.get('type')?.markAsTouched();
  }

  invalid(control: string): boolean {
    const c = this.addressForm.get(control);
    return !!c && c.invalid && c.touched;
  }

  submit() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this._addressService.create(this.addressForm.value).subscribe({
      next: () => {
        this.addressForm.reset({ is_default: false });
        this.cancel.emit(); // Only close on success
      },
      error: (error) => {
        this._toastService.error(error?.error?.message || "Couldn't save the address. Try again.");
      },
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
