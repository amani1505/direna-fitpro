import { CommonModule, Location } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeachableSelectComponent } from '@components/select/seachable-select/seachable-select.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxMaskDirective } from 'ngx-mask';
import { AddBranchModalComponent } from '../../branch-pageview/add-branch-modal/add-branch-modal.component';
import { AddRoleComponent } from '../../roles-pageview/add-role/add-role.component';
import { BranchesService } from '@service/modules/branches.service';
import { RolesService } from '@service/modules/roles.service';
import { StaffService } from '@service/modules/staff.service';
import { ToastService } from '@service/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-staff-pageview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    AngularSvgIconModule,
    SeachableSelectComponent,
    AddBranchModalComponent,
    AddRoleComponent,
  ],
  templateUrl: './edit-staff-pageview.component.html',
  styleUrl: './edit-staff-pageview.component.scss',
})
export class EditStaffPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _route = inject(ActivatedRoute);
  private _location = inject(Location);
  private _branchesService = inject(BranchesService);
  private _rolesService = inject(RolesService);
  private _staffService = inject(StaffService);
  private _toast = inject(ToastService);

  staff = computed(() => this._staffService.staff());
  branches = computed(() => this._branchesService.allBranches() || []);
  roles = computed(() => this._rolesService.allRoles() || []);

  staffLoading = this._staffService.loading;

  isBranchModalOpen = signal<boolean>(false);
  isRoleModalOpen = signal<boolean>(false);

  selectedBranch = signal<string>('');
  selectedRole = signal<string>('');
  staffId = signal<string>('');
  staffForm: FormGroup;

  constructor() {
    this.staffForm = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      branchId: [''],
      role: [''],
      gender: ['', Validators.required],
    });

    effect(
      () => {
        const staff = this.staff();
        if (staff) {
          this.staffForm.patchValue({
            fullname: staff.fullname,
            email: staff.email,
            phone: staff.phone,
            branchId: staff.branch?.id,
            gender: staff.gender,
            address: staff.address,
            city: staff.city,
            role: staff.role?.id,
          });

          this.selectedBranch.set(staff.branch?.id);
          this.selectedRole.set(staff.role?.id);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.staffId.set(id);
    this._branchesService.getAllBranches();
    this._rolesService.getAllRolesExceptUser();

    this._staffService.findOne(id, ['branch', ]);
  }

  transformBranchToSelectOptions = (
    apiData: Array<any>,
  ): Array<{ label: string; value: string }> => {
    return apiData.map((item) => ({
      label: item.road,
      value: item.id,
    }));
  };

  transformRoleToSelectOptions = (
    apiData: Array<any>,
  ): Array<{ label: string; value: string }> => {
    return apiData.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };

  onValidationChange(isValid: boolean) {
    // console.log('Is valid:', isValid);
  }

  selectBranch(id: any) {
    this.selectedBranch.set(id);
    this.staffForm.patchValue({
      branchId: id,
    });
  }

  selectRole(id: any) {
    this.selectedRole.set(id);
    this.staffForm.patchValue({
      role: id,
    });
  }

  openBranchModal() {
    this.isBranchModalOpen.set(true);
  }

  openRoleModal() {
    this.isRoleModalOpen.set(true);
  }

  closeBranchModal() {
    this.isBranchModalOpen.set(false);
  }
  closeRoleModal() {
    this.isRoleModalOpen.set(false);
  }

  submit() {
    if (this.staffForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }
    const data = {
      ...this.staffForm.value,
    };

    this._staffService.update(this.staffId(), data).subscribe({
      next: () => {
        this.cancel();
      },
      error: () => {
        this._toast.error('An error occurred will updating');
      },
    });
  }
  cancel() {
    this._location.back();
  }
}
