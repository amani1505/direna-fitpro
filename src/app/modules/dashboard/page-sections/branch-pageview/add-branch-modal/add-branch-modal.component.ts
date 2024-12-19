import { Component, Input } from '@angular/core';
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
  @Input({ required: true }) isModalOpen: boolean = false;

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'lg',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };


}
