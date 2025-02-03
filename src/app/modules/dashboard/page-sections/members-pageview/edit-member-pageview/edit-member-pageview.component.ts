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
import { MultiSelectComponent } from '@components/select/multi-select/multi-select.component';
import { SeachableSelectComponent } from '@components/select/seachable-select/seachable-select.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxMaskDirective } from 'ngx-mask';
import { AddBranchModalComponent } from '../../branch-pageview/add-branch-modal/add-branch-modal.component';
import { AddServiceModalComponent } from '../../services-pageview/add-service-modal/add-service-modal.component';
import { BranchesService } from '@service/modules/branches.service';
import { MemberService } from '@service/modules/member.service';
import { ServicesService } from '@service/modules/services.service';
import { ToastService } from '@service/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-member-pageview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MultiSelectComponent,
    AngularSvgIconModule,
    SeachableSelectComponent,
    AddServiceModalComponent,
    AddBranchModalComponent,
  ],
  templateUrl: './edit-member-pageview.component.html',
  styleUrl: './edit-member-pageview.component.scss',
})
export class EditMemberPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _route = inject(ActivatedRoute);
  private _location = inject(Location);
  private _servicesService = inject(ServicesService);
  private _branchesService = inject(BranchesService);
  private _memberService = inject(MemberService);
  private _toast = inject(ToastService);

  member = computed(() => this._memberService.member());
  services = computed(() => this._servicesService.allServices() || []);
  branches = computed(() => this._branchesService.allBranches() || []);
  loading = this._servicesService.loading;
  memberLoading = this._memberService.loading;

  isServiceModalOpen = signal<boolean>(false);
  isBranchModalOpen = signal<boolean>(false);

  selectedServices = signal<string[]>([]);
  selectedBranch = signal<string>('');
  memberId = signal<string>('');

  memberForm: FormGroup;

  constructor() {
    this.memberForm = this._formBuilder.group({
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

    effect(
      () => {
        const member = this.member();
        if (member) {
          this.memberForm.patchValue({
            fullname: member.fullname,
            email: member.email,
            phone: member.phone,
            branchId: member.branch?.id,
            gender: member.gender,
            age: member.age,
            weight: member.weight,
            height: member.height,
            goal: member.goal,
          });
          this.selectedServices.set(
            member.services?.map((service) => service.id),
          );

          this.selectedBranch.set(member.branch?.id || '');
        }
      },
      { allowSignalWrites: true }, // Enable signal writes inside the effect
    );
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.memberId.set(id);
    this._servicesService.getAllServices();
    this._branchesService.getAllBranches();

    this._memberService.findOne(id, ['branch', 'services']);
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

  selectService(ids: any) {
    this.selectedServices.set(ids);
  }
  selectBranch(id: any) {
    this.selectedBranch.set(id);
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

    const data = {
      serviceIds: this.selectedServices(),
      ...this.memberForm.value,
    };

    this._memberService.update(this.memberId(), data).subscribe({
      next: () => {
        this.cancel();
      },
      error: () => {
        this._toast.error('An error occurred while updating');
      },
    });
  }
  cancel() {
    this._location.back();
  }
}
