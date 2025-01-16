import { CommonModule, Location } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeachableSelectComponent } from '@components/select/seachable-select/seachable-select.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxMaskDirective } from 'ngx-mask';
import { AddBranchModalComponent } from '../../branch-pageview/add-branch-modal/add-branch-modal.component';
import { StaffService } from '@service/modules/staff.service';
import { BranchesService } from '@service/modules/branches.service';
import { ToastService } from '@service/toast.service';
import { Services } from '../../../../../models/services.interface';

@Component({
  selector: 'create-staff-pageview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    AngularSvgIconModule,
    SeachableSelectComponent,
    AddBranchModalComponent,
  ],
  templateUrl: './create-staff-pageview.component.html',
  styleUrl: './create-staff-pageview.component.scss',
})
export class CreateStaffPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _location = inject(Location);
  private _branchesService = inject(BranchesService);
  private _staffService = inject(StaffService);
  private _toast = inject(ToastService);

  branches = computed(() => this._branchesService.allBranches() || []);

  staffLoading = this._staffService.loading;

  isBranchModalOpen = signal<boolean>(false);

  selectedBranch: string = '';

  staffForm = this._formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    branchId: [''],
    gender: ['', Validators.required],
  });

  ngOnInit(): void {
    this._branchesService.getAllBranches();
  }

  transformToMultiSelectOptions = (
    apiData: Array<any>,
  ): Array<{ label: string; value: string }> => {
    return apiData.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };

  transformToSelectOptions = (
    apiData: Array<any>,
  ): Array<{ label: string; value: string }> => {
    return apiData.map((item) => ({
      label: item.road,
      value: item.id,
    }));
  };

  onValidationChange(isValid: boolean) {
    // console.log('Is valid:', isValid);
  }

  selectBranch(id: any) {
    this.selectedBranch = id;
    this.staffForm.patchValue({
      branchId: id,
    });
  }
  openBranchModal() {
    this.isBranchModalOpen.set(true);
  }
  closeBranchModal() {
    this.isBranchModalOpen.set(false);
  }

  submit() {
    if (this.staffForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }
    console.log('submit', this.staffForm.value);
    const data = {
      ...this.staffForm.value,
    };

    this._staffService.create(data).subscribe({
      next: () => {
        this.cancel();
      },
      error: () => {
        // Error is already handled in the service
        // Just stay on the form
      },
    });
  }
  cancel() {
    this._location.back();
  }
}
