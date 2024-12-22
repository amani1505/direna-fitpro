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
import { BranchesService } from '@service/modules/branches.service';

@Component({
  selector: 'add-branch-modal',
  standalone: true,
  imports: [
    ReusableModalComponent,
    NgClass,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-branch-modal.component.html',
  styleUrl: './add-branch-modal.component.scss',
})
export class AddBranchModalComponent {
  isModalOpen = input.required<boolean>();

  @Output() onCancel = new EventEmitter<any>();

  private _branchesService = inject(BranchesService);
  private _formBuilder = inject(FormBuilder);
  loading = this._branchesService.loading;

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'lg',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };

  createBranchForm = this._formBuilder.group({
    city: ['', Validators.required],
    country: ['', Validators.required],
    street: ['', Validators.required],
    district: ['', Validators.required],
    house_no: ['', Validators.required],
    road: ['', Validators.required],
  });

  submit() {
    if (this.createBranchForm.invalid) {
      return;
    }
    const { city, country, street, district, house_no, road } =
      this.createBranchForm.value;

    this._branchesService.create('getAll', {
      city,
      country,
      street,
      district,
      house_no,
      road,
    });

    this.createBranchForm.reset();
    this.onCancel.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
