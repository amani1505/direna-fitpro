import { NgIf, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
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
import { RolesService } from '@service/modules/roles.service';

@Component({
  selector: 'add-role-modal',
  standalone: true,
  imports: [
    ReusableModalComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss',
})
export class AddRoleComponent {
  isModalOpen = input.required<boolean>();
  @Input({ required: true }) refetchString: 'getAll' | 'findAll' = 'getAll';
  @Output() onCancel = new EventEmitter<any>();

  private _rolesService = inject(RolesService);
  private _formBuilder = inject(FormBuilder);
  loading = this._rolesService.loading;

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'lg',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };

  roleForm = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  submit() {
    if (this.roleForm.invalid) {
      return;
    }
    const { name, description } = this.roleForm.value;
    this._rolesService.create(this.refetchString, { name, description });
    this.onCancel.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
