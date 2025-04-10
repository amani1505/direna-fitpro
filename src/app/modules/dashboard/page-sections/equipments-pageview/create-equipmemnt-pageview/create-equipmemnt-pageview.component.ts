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
import { QuillModule } from 'ngx-quill';

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
    QuillModule,
  ],
  templateUrl: './create-equipmemnt-pageview.component.html',
  styleUrl: './create-equipmemnt-pageview.component.scss',
})
export class CreateEquipmemntPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _equipmemntService = inject(EquipmentService);
  private _equipmentCategoryService = inject(EquipmemntCategoryService);
  private _toast = inject(ToastService);
  readonly MAX_IMAGES = 10;
  readonly MIN_IMAGES = 4;

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
  selectedImages: File[] = new Array(this.MIN_IMAGES).fill(null); // Initialize with 4 null slots
  imageUploaders: number[] = [0, 1, 2, 3];

  equipmentForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    isPublished: [false, Validators.required],
    model: ['', Validators.required],
    serial_number: ['', Validators.required],
    purchase_date: ['', Validators.required],
    price: [1, Validators.required],
    short_description: ['', Validators.required],
    quantity: [1, Validators.required],
    status: ['', Validators.required],
    used_for: ['', Validators.required],
  });

  ngOnInit(): void {
    this._equipmentCategoryService.getAllEquipmentCategory();
  }

  canAddMoreImages(): boolean {
    return this.imageUploaders.length < this.MAX_IMAGES;
  }

  canRemoveUploader(index: number): boolean {
    return this.imageUploaders.length > this.MIN_IMAGES;
  }

  addImageUploader(): void {
    if (this.canAddMoreImages()) {
      const newIndex = this.imageUploaders.length;
      this.imageUploaders.push(newIndex);
      this.selectedImages[newIndex] = null;
    } else {
      this._toast.warning(`Maximum of ${this.MAX_IMAGES} images allowed`);
    }
  }

  removeImageUploader(index: number): void {
    if (this.canRemoveUploader(index)) {
      // Remove the uploader at this index
      this.imageUploaders.splice(index, 1);
      this.selectedImages.splice(index, 1);

      // Reassign indices to match array positions
      this.imageUploaders = this.imageUploaders.map((_, i) => i);
    } else {
      this._toast.warning(`Minimum of ${this.MIN_IMAGES} images required`);
    }
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
  getValidImageCount(): number {
    return this.selectedImages.filter((img) => img !== null).length;
  }
  onDescriptionChange(event: any) {
    this.equipmentForm.get('description').setValue(event.html);
  }

  submit() {
    if (this.equipmentForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }

    const validImages = this.selectedImages.filter((img) => img !== null);

    if (validImages.length < this.MIN_IMAGES) {
      this._toast.error(`You need at least ${this.MIN_IMAGES} images`);
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
