import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MultiSelectComponent } from '@components/select/multi-select/multi-select.component';
import { SeachableSelectComponent } from '@components/select/seachable-select/seachable-select.component';
import { BranchesService } from '@service/modules/branches.service';
import { ServicesService } from '@service/modules/services.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxMaskDirective } from 'ngx-mask';
import { ContentChange, QuillModule } from 'ngx-quill';

@Component({
  selector: 'member-registration',
  imports: [
    AngularSvgIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgClass,
    NgxMaskDirective,
    MultiSelectComponent,
    SeachableSelectComponent,
    QuillModule,
  ],
  templateUrl: './member.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './member.component.scss',
})
export class MemberComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private _servicesService = inject(ServicesService);
  private _branchesService = inject(BranchesService);

  services = computed(() => this._servicesService.allServices() || []);
  branches = computed(() => this._branchesService.allBranches() || []);

  selectedServices: string[] = [];
  selectedBranch = '';

  passwordTextType!: boolean;
  submitted = false;
  loading = false;

  authForm = this._formBuilder.group({
    first_name: ['', Validators.required],
    middle_name: [''],
    last_name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    branchId: ['', Validators.required],
    age: [0],
    weight: ['', Validators.required],
    height: [''],
    goal: ['', Validators.required],
  });

  ngOnInit(): void {
    this._servicesService.getAllServices();
    this._branchesService.getAllBranches();
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  transformToMultiSelectOptions = (
    apiData: { id: string; name: string }[],
  ): { label: string; value: string }[] => {
    return apiData.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };

  transformToSelectOptions = (
    apiData: { id: string; road: string }[],
  ): { label: string; value: string }[] => {
    return apiData.map((item) => ({
      label: item.road,
      value: item.id,
    }));
  };
  onGoalChange(event: ContentChange) {
    this.authForm.get('goal').setValue(event.html);
  }

  selectService(ids: string[]) {
    this.selectedServices = ids;
  }
  selectBranch(id: string) {
    this.selectedBranch = id;
    this.authForm.patchValue({
      branchId: id,
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    }

    // TODO: send the member registration (this.authForm.value) to the API.
    // The form is validated but nothing is submitted yet.
    this._router.navigate(['/']);
  }
}
