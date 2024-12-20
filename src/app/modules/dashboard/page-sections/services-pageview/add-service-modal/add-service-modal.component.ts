import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableModalComponent } from '@components/modal/reusable-modal/reusable-modal.component';
import { ModalConfig } from '@model/modal-config.interface';
import { ServicesService } from '@service/modules/services.service';

@Component({
  selector: 'add-service-modal',
  standalone: true,
  imports: [
    ReusableModalComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './add-service-modal.component.html',
  styleUrl: './add-service-modal.component.scss',
})
export class AddServiceModalComponent {
  isModalOpen = input.required<boolean>();

  @Output() onCancel = new EventEmitter<number>();

  private _servicesService = inject(ServicesService);
  private _formBuilder = inject(FormBuilder);
  loading = this._servicesService.loading;

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'lg',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };

  createServiceForm = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  submit() {
    if (this.createServiceForm.invalid) {
      return;
    }
    const { name, description } = this.createServiceForm.value;
    this._servicesService.create('getAll', { name, description });
    this.onCancel.emit();


  }

  cancel() {
    this.onCancel.emit();
  }
}
