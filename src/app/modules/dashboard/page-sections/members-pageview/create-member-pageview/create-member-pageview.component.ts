import { CommonModule, Location, NgClass, NgIf } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSelectComponent } from '@components/select/multi-select/multi-select.component';
import { SeachableSelectComponent } from '@components/select/seachable-select/seachable-select.component';
import { BranchesService } from '@service/modules/branches.service';
import { ServicesService } from '@service/modules/services.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AddServiceModalComponent } from '../../services-pageview/add-service-modal/add-service-modal.component';
import { AddBranchModalComponent } from '../../branch-pageview/add-branch-modal/add-branch-modal.component';
import { MemberService } from '@service/modules/member.service';
import { ToastService } from '@service/toast.service';

@Component({
  selector: 'create-member-pageview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgxMaskDirective,
    MultiSelectComponent,
    AngularSvgIconModule,
    SeachableSelectComponent,
    AddServiceModalComponent,
    AddBranchModalComponent,
  ],
  providers: [provideNgxMask()],
  templateUrl: './create-member-pageview.component.html',
  styleUrl: './create-member-pageview.component.scss',
})
export class CreateMemberPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private _location = inject(Location);
  private _servicesService = inject(ServicesService);
  private _branchesService = inject(BranchesService);
  private _memberService = inject(MemberService);
  private _toast = inject(ToastService);

  services = computed(() => this._servicesService.allServices() || []);
  branches = computed(() => this._branchesService.allBranches() || []);
  loading = this._servicesService.loading;
  memberLoading = this._memberService.loading;

  isServiceModalOpen = signal<boolean>(false);
  isBranchModalOpen = signal<boolean>(false);

  selectedServices: Array<string> = [];
  selectedBranch: string = '';

  memberForm = this._formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    branchId: [''],
    gender: ['', Validators.required],
    age: [0],
    weight: ['', Validators.required],
    height: [''],
    goal: ['', Validators.required],
  });

  ngOnInit(): void {
    this._servicesService.getAllServices();
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

  selectService(ids: any) {
    this.selectedServices = ids;
  }
  selectBranch(id: any) {
    this.selectedBranch = id;
    this.memberForm.patchValue({
      branchId: id,
    });
  }
  openServiceModal() {
    this.isServiceModalOpen.set(true);
  }
  closeServiceModal() {
    this.isServiceModalOpen.set(false);
  }
  openBranchModal() {
    this.isBranchModalOpen.set(true);
  }
  closeBranchModal() {
    this.isBranchModalOpen.set(false);
  }

  submit() {
    if (this.memberForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }
    console.log('submit', this.memberForm.value);
    const data = {
      serviceIds: this.selectedServices,
      ...this.memberForm.value,
    };

    this._memberService.create(data).subscribe({
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
