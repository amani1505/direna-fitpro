import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableModalComponent } from '@components/modal/reusable-modal/reusable-modal.component';
import { Address } from '@model/address.interface';
import { ModalConfig } from '@model/modal-config.interface';
import { AddressService } from '@service/modules/address.service';
import { ToastService } from '@service/toast.service';

@Component({
  selector: 'update-address',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ReusableModalComponent, NgClass],
  templateUrl: './update-address.component.html',
  styleUrl: './update-address.component.scss',
})
export class UpdateAddressComponent implements OnInit {
  isModalOpen = input.required<boolean>();
  @Input({ required: true }) address: Address = undefined;

  @Output() cancel = new EventEmitter<any>();

  private _addressService = inject(AddressService);
  private _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);
  loading = this._addressService.loading;

  addressForm: FormGroup;

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'xl',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };

  ngOnInit(): void {
    this.addressForm = this._formBuilder.group({
      city: [this.address.city, Validators.required],
      country: [this.address.country, Validators.required],
      street: [this.address.street, Validators.required],
      zip_code: [this.address.zip_code],
      state: [this.address.state],
      district: [this.address.district, Validators.required],
      type: [this.address.type, Validators.required],
      is_default: [this.address.is_default],
    });
  }

  submit() {
    if (this.addressForm.invalid) {
      return;
    }

    this._addressService
      .update(this.address.id, this.addressForm.value)
      .subscribe({
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
