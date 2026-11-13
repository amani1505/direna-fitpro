import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableModalComponent } from '@components/modal/reusable-modal/reusable-modal.component';
import { ModalConfig } from '@model/modal-config.interface';
import { Services } from '@model/services.interface';
import { ServicesService } from '@service/modules/services.service';

@Component({
  selector: 'edit-service',
  imports: [ReusableModalComponent, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './edit-service.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './edit-service.component.scss',
})
export class EditServiceComponent implements OnInit {
  isModalOpen = input.required<boolean>();
  @Input({ required: true }) refetchString: 'getAll' | 'findAll' = 'getAll';
  @Input({ required: true }) service: Services = undefined;
  @Output() onCancel = new EventEmitter<void>();

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

  editServiceForm: FormGroup;

  ngOnInit(): void {
    if (this.service) {
      this.editServiceForm = this._formBuilder.group({
        name: [this.service.name, Validators.required],
        description: [this.service.description, Validators.required],
      });
    }
  }

  submit() {
    if (this.editServiceForm.invalid) {
      return;
    }
    const { name, description } = this.editServiceForm.value;
    this._servicesService.update(this.refetchString, this.service.id, {
      name,
      description,
    });
    this.onCancel.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
