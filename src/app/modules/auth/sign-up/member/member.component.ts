import { NgClass, NgIf } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
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
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'member-registration',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgIf,
    NgClass,
    NgxMaskDirective,
    MultiSelectComponent,
    SeachableSelectComponent,
    QuillModule,
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
})
export class MemberComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private _servicesService = inject(ServicesService);
  private _branchesService = inject(BranchesService);

  services = computed(() => this._servicesService.allServices() || []);
  branches = computed(() => this._branchesService.allBranches() || []);

  selectedServices: Array<string> = [];
  selectedBranch: string = '';

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
  onGoalChange(event: any) {
     this.authForm.get('goal').setValue(event.html);
  }

  selectService(ids: any) {
    this.selectedServices = ids;
  }
  selectBranch(id: any) {
    this.selectedBranch = id;
    this.authForm.patchValue({
      branchId: id,
    });
  }

  onSubmit() {
    this.submitted = true;
    const { email } = this.authForm.value;

    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    }

    this._router.navigate(['/']);
  }
}
