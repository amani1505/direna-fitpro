import { NgClass, Location } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { MultiSelectComponent } from '@components/select/multi-select/multi-select.component';
import { NormalSelectComponent } from '@components/select/normal-select/normal-select.component';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { EquipmentService } from '@service/modules/equipment.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'create-equipmemnt-pageview',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    NormalSelectComponent,
    ImageUploaderComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MultiSelectComponent,
  ],
  templateUrl: './create-equipmemnt-pageview.component.html',
  styleUrl: './create-equipmemnt-pageview.component.scss',
})
export class CreateEquipmemntPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _equipmemntService = inject(EquipmentService);
  private _equipmentCategoryService = inject(EquipmemntCategoryService);
  private _toast = inject(ToastService);

  private _location = inject(Location);
  categories = computed(
    () => this._equipmentCategoryService.allEquipmentCategories() || [],
  );

  createLoading = this._equipmentCategoryService.loading;

  status = [
    {
      label: 'New Arrival',
      value: 'new arrival',
    },
    {
      label: 'Out of Stock',
      value: 'out of stock',
    },
    {
      label: 'Restocked',
      value: 'restocked',
    },
    {
      label: 'Upcomming Stock',
      value: 'upcomming stock',
    },
  ];

  usedFor = [
    {
      label: 'For GYM',
      value: 'for gym',
    },
    {
      label: 'For Sale',
      value: 'for sale',
    },
    {
      label: 'Personal',
      value: 'personal',
    },
  ];

  selectedCategories: Array<string> = [];
  selectedStatus: string = '';
  selectedUsedFor: string = '';
  selectedImages: File[] = [];

  equipmentForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    isPublished: [false, Validators.required],
    model: ['', Validators.required],
    serial_number: ['', Validators.required],
    purchase_date: ['', Validators.required],
    price: [1, Validators.required],
    quantity: [1, Validators.required],
    status: ['', Validators.required],
    used_for: ['', Validators.required],
  });

  ngOnInit(): void {
    this._equipmentCategoryService.getAllEquipmentCategory();
    this._equipmemntService.findAll()
  }

  transformToMultiSelectOptions = (
    apiData: Array<any>,
  ): Array<{ label: string; value: string }> => {
    return apiData.map((item) => ({
      label: item.category_name,
      value: item.id,
    }));
  };

  selectCategory(ids: any) {
    this.selectedCategories = ids;
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.equipmentForm.patchValue({
      status: status,
    });
  }

  selectUsedFor(status: string) {
    this.selectedUsedFor = status;
    this.equipmentForm.patchValue({
      used_for: status,
    });
  }

  onImageSelected(event: File, index: number) {
    if (event) {
      this.selectedImages[index] = event;
    } else {
      this.selectedImages.splice(index, 1);
    }
  }

  submit() {
    if (this.equipmentForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }

    const validImages = this.selectedImages.filter((img) => img !== null);

    if (validImages.length < 4) {
      this._toast.error('You need at least 4 images');
      return;
    }

    const formValues = {
      equipmentCategoryIds: this.selectedCategories,
      ...this.equipmentForm.value,
    };

    const formData = new FormData();

    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        if (key === 'isPublished') {
          formData.append(key, String(formValues[key])); // Ensure boolean is sent as string
        } else if (key === 'equipmentCategoryIds') {
          formValues.equipmentCategoryIds.forEach((id: string) => {
            formData.append('equipmentCategoryIds[]', id);
          });
        } else {
          formData.append(key, formValues[key]);
        }
      }
    }

    // Append images correctly
    validImages.forEach((image) => {
      formData.append('equipmentImages', image);
    });

    this._equipmemntService.create(formData).subscribe({
      next: () => {
        this.cancel();
      },
      error: () => {
        this._toast.error('An error occurred while creating');
      },
    });
  }

  cancel() {
    this._location.back();
  }
}
