import { CommonModule, NgClass, NgIf, Location } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { MultiSelectComponent } from '@components/select/multi-select/multi-select.component';
import { NormalSelectComponent } from '@components/select/normal-select/normal-select.component';
import { ClassesService } from '@service/modules/classes.service';
import { StaffService } from '@service/modules/staff.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'create-class-pageview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    AngularSvgIconModule,
    ImageUploaderComponent,
  ],
  templateUrl: './create-class-pageview.component.html',
  styleUrl: './create-class-pageview.component.scss',
})
export class CreateClassPageviewComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private _location = inject(Location);
  private _classesService = inject(ClassesService);
  private _staffService = inject(StaffService);
  private _toast = inject(ToastService);

  staffs = computed(() => this._staffService.allStaffs() || []);

  loading = this._staffService.loading;
  classLoading = this._classesService.loading;

  selectedImage: File = null;

  // dayOptions = [
  //   { label: 'Monday', value: 'Monday' },
  //   { label: 'Tuesday', value: 'Tuesday' },
  //   { label: 'Wednesday', value: 'Wednesday' },
  //   { label: 'Thursday', value: 'Thursday' },
  //   { label: 'Friday', value: 'Friday' },
  //   { label: 'Saturday', value: 'Saturday' },
  //   { label: 'Sunday', value: 'Sunday' },
  // ];

  // selectedStaff: Array<string> = [];
  // selectedDay = '';

  classForm = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    // day: ['', Validators.required],
    // color: ['#ff4836'],
    capacity: [1, Validators.required],
    // startTime: ['', Validators.required],
    // endTime: ['', Validators.required],
  });
  // ngOnInit(): void {
  //   this._staffService.getAllStaffs();
  // }

  // transformToMultiSelectOptions = (
  //   apiData: Array<any>,
  // ): Array<{ label: string; value: string }> => {
  //   return apiData.map((item) => ({
  //     label: item.fullname,
  //     value: item.id,
  //   }));
  // };

  // selectStaffs(ids: any) {
  //   this.selectedStaff = ids;
  // }
  // selectWeekDay(value: string) {
  //   this.selectedDay = value;
  //   this.classForm.patchValue({
  //     day: value,
  //   });
  // }

  // addNewTrainer() {
  //   this._router.navigate(['/admin/staffs/add']);
  // }
  onImageSelected(event: File) {
    this.selectedImage = event;
  }
  submit() {
    if (this.classForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }

    const formValues = {
      ...this.classForm.value,
      class: this.selectedImage,
    };

    const formData = new FormData();

    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        // if (key === 'staffIds') {
        //   formValues.staffIds.forEach((id: string) => {
        //     formData.append('staffIds[]', id);
        //   });
        // } else {
          formData.append(key, formValues[key]);
        // }
      }
    }

    this._classesService.create(formData).subscribe({
      next: () => {
        this.cancel();
      },
      error: () => {
        this._toast.error('An error occurred while saving the data!');
      },
    });
  }

  cancel() {
    this._location.back();
  }
}
