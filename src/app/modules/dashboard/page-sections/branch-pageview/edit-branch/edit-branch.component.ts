import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
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
import { Branch } from '@model/branch.interface';
import { ModalConfig } from '@model/modal-config.interface';
import { BranchesService } from '@service/modules/branches.service';

@Component({
  selector: 'edit-branch',
  standalone: true,
  imports: [
    ReusableModalComponent,
    NgClass,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-branch.component.html',
  styleUrl: './edit-branch.component.scss',
})
export class EditBranchComponent implements OnInit {
  isModalOpen = input.required<boolean>();
  @Input({ required: true }) refetchString: 'getAll' | 'findAll' = 'getAll';
  @Input({ required: true }) branch: Branch = undefined;

  @Output() onCancel = new EventEmitter<any>();

  private _branchesService = inject(BranchesService);
  private _formBuilder = inject(FormBuilder);

  loading = this._branchesService.loading;

  editBranchForm: FormGroup;

  ngOnInit(): void {
    if (this.branch) {
      this.editBranchForm = this._formBuilder.group({
        city: [this.branch.city, Validators.required],
        country: [this.branch.country, Validators.required],
        street: [this.branch.street, Validators.required],
        district: [this.branch.district, Validators.required],
        house_no: [this.branch.house_no, Validators.required],
        road: [this.branch.road, Validators.required],
      });
    }
  }

  modalConfig: ModalConfig = {
    title: 'Confirm Action',
    size: 'xl',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    closeOnOverlayClick: true,
    customClass: 'my-custom-modal',
  };


  submit() {
    if (this.editBranchForm.invalid) {
      return;
    }
    const { city, country, street, district, house_no, road } =
      this.editBranchForm.value;

    this._branchesService.update(this.refetchString, this.branch.id,{
      city,
      country,
      street,
      district,
      house_no,
      road,
    });

    this.editBranchForm.reset();
    this.onCancel.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
