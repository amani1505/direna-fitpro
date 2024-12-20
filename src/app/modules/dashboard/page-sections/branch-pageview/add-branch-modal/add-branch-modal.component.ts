import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { ReusableModalComponent } from '@components/modal/reusable-modal/reusable-modal.component';
import { ModalConfig } from '@model/modal-config.interface';

@Component({
  selector: 'add-branch-modal',
  standalone: true,
  imports: [ReusableModalComponent],
  templateUrl: './add-branch-modal.component.html',
  styleUrl: './add-branch-modal.component.scss',
})
export class AddBranchModalComponent {
  isModalOpen = input.required<boolean>();

  @Output() onCancel = new EventEmitter<number>();

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'lg',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };

  submit() {}

  cancel() {
  this.onCancel.emit()
  }
}
