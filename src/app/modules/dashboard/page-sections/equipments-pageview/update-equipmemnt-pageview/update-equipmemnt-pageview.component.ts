import { NgClass, Location } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { MultiSelectComponent } from '@components/select/multi-select/multi-select.component';
import { NormalSelectComponent } from '@components/select/normal-select/normal-select.component';
import { Files } from '@model/files';
import { EquipmemntCategoryService } from '@service/modules/equipment-category.service';
import { EquipmentService } from '@service/modules/equipment.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { Subscription } from 'rxjs';

@Component({
  selector: 'update-equipmemnt-pageview',
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
  templateUrl: './update-equipmemnt-pageview.component.html',
  styleUrl: './update-equipmemnt-pageview.component.scss',
})
export class UpdateEquipmemntPageviewComponent implements OnInit, OnDestroy {
  private readonly _formBuilder = inject(FormBuilder);
  private _equipmemntService = inject(EquipmentService);
  private _equipmentCategoryService = inject(EquipmemntCategoryService);
  private _toast = inject(ToastService);
  private _route = inject(ActivatedRoute);
  private quillInstance: Quill | null = null;
  private isSettingContent = false;
  private quillChangeHandler: (() => void) | null = null;
  private isUpdatingContent = false;

  fileUrl = environment.staicUrl;

  readonly MAX_IMAGES = 10;
  readonly MIN_IMAGES = 4;

  private _location = inject(Location);

  categories = computed(
    () => this._equipmentCategoryService.allEquipmentCategories() || [],
  );

  equipment = computed(() => this._equipmemntService.equipment());
  createLoading = this._equipmentCategoryService.loading;

  status = [
    { label: 'New Arrival', value: 'new arrival' },
    { label: 'Out of Stock', value: 'out of stock' },
    { label: 'Restocked', value: 'restocked' },
    { label: 'Upcoming Stock', value: 'upcomming stock' },
  ];

  usedFor = [
    { label: 'For GYM', value: 'for gym' },
    { label: 'For Sale', value: 'for sale' },
    { label: 'Personal', value: 'personal' },
  ];

  selectedCategories = signal<Array<string>>([]);
  selectedStatus = signal<string>('');
  selectedUsedFor = signal<string>('');
  selectedImages = signal<Files[]>(new Array(this.MIN_IMAGES).fill(null));
  imageUploaders: number[] = [0, 1, 2, 3];
  equipmentId = signal<string>('');

  equipmentForm: FormGroup;

  constructor() {
    this.equipmentForm = this._formBuilder.group({
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

    effect(
      () => {
        const equipment = this.equipment();

        if (equipment) {
          const formattedPurchaseDate = this.formatDateForInput(
            equipment.purchase_date,
          );
          this.equipmentForm.patchValue({
            title: equipment.title,
            description: equipment.description || '',
            isPublished: equipment.isPublished,
            model: equipment.model,
            serial_number: equipment.serial_number,
            purchase_date: formattedPurchaseDate,
            price: equipment.price,
            short_description: equipment.short_description,
            quantity: equipment.quantity,
            status: equipment.status,
            used_for: equipment.used_for,
          });

          this.selectedCategories.set(
            equipment.categories?.map((category) => category.id),
          );

          this.selectedStatus.set(equipment.status || '');
          this.selectedUsedFor.set(equipment.used_for || '');

          this.selectedImages.set(equipment.files || null);
          if (this.quillInstance) {
            this.isSettingContent = true;
            this.quillInstance.setText(equipment.description || '');
            this.isSettingContent = false;
          }
        }
      },
      { allowSignalWrites: true },
    );
  }

  private formatDateForInput(isoDate: string): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.equipmentId.set(id);

    this._equipmentCategoryService.getAllEquipmentCategory();
    this._equipmemntService.findOne(id, ['files', 'categories']);
  }

  canAddMoreImages(): boolean {
    return this.imageUploaders.length < this.MAX_IMAGES;
  }

  canRemoveUploader(index: number): boolean {
    // Allow deletion only if:
    // 1. There are more than the minimum required images, OR
    // 2. The image at the current index is a newly uploaded image (not from the API).
    return (
      this.imageUploaders.length > this.MIN_IMAGES ||
      !this.selectedImages()[index]?.file_path // Check if the image is not from the API
    );
  }

  addImageUploader(): void {
    if (this.canAddMoreImages()) {
      const newIndex = this.imageUploaders.length;
      this.imageUploaders.push(newIndex);
      this.selectedImages()[newIndex] = null; // Initialize new slot as null
    } else {
      this._toast.warning(`Maximum of ${this.MAX_IMAGES} images allowed`);
    }
  }

  removeImageUploader(index: number): void {
    if (this.canRemoveUploader(index)) {
      // Only remove the image if it's not from the API or if there are more than the minimum required images.
      if (
        this.imageUploaders.length > this.MIN_IMAGES ||
        !this.selectedImages()[index]?.file_path
      ) {
        this.imageUploaders.splice(index, 1);
        this.selectedImages().splice(index, 1);
        this.imageUploaders = this.imageUploaders.map((_, i) => i);
      } else {
        this._toast.warning(
          'You cannot delete this image unless you upload a new one.',
        );
      }
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
    this.selectedCategories.set(ids);
  }

  selectStatus(status: string) {
    this.selectedStatus.set(status);
    this.equipmentForm.patchValue({
      status: status,
    });
  }

  selectUsedFor(status: string) {
    this.selectedUsedFor.set(status);
    this.equipmentForm.patchValue({
      used_for: status,
    });
  }

  onImageSelected(event: any, index: number, id: string) {
    if (event) {
      this.selectedImages()[index] = event;
      const formData = new FormData();

      formData.append('equipmentImages', event);
      if (id) {
        this._equipmemntService.updateImage(id, formData).subscribe(() => {
          this._equipmemntService.findOne(this.equipmentId(), [
            'files',
            'categories',
          ]);
        });
      } else {
        this._equipmemntService
          .uploadImage(this.equipmentId(), formData)
          .subscribe(() => {
            this._equipmemntService.findOne(this.equipmentId(), [
              'files',
              'categories',
            ]);
          });
      }
    } else {
      // Only allow deletion if the image is not from the API or if there are more than the minimum required images.
      if (
        this.imageUploaders.length > this.MIN_IMAGES ||
        !this.selectedImages()[index]?.file_path
      ) {
        this.selectedImages().splice(index, 1);
      } else {
        this._toast.warning(
          'You cannot delete this image unless you upload a new one.',
        );
      }
    }
  }

  getValidImageCount(): number {
    return this.selectedImages().filter((img) => img !== null).length;
  }

  onEditorCreated(quill: Quill) {
    this.quillInstance = quill;

    // Remove any existing change handler to prevent multiple listeners
    if (this.quillChangeHandler) {
      this.quillChangeHandler();
      this.quillChangeHandler = null;
    }

    const textChangeHandler = (delta: any, oldDelta: any, source: string) => {
      // Only handle user-initiated changes
      if (source === 'user' && !this.isUpdatingContent) {
        this.updateDescriptionFromQuill(quill);
      }
    };

    // Add the event listener
    quill.on('text-change', textChangeHandler);

    // Store the cleanup function
    this.quillChangeHandler = () => {
      quill.off('text-change', textChangeHandler);
    };
  }

  private updateDescriptionFromQuill(quill: Quill) {
    try {
      // Prevent recursive updates
      this.isUpdatingContent = true;

      // Get the HTML content from Quill
      const htmlContent = quill.root.innerHTML;

      // Update form control without triggering events
      this.equipmentForm.get('description').setValue(htmlContent, {
        emitEvent: false,
        onlySelf: true,
      });
    } catch (error) {
      console.error('Error updating description:', error);
      this._toast.error('Could not update description');
    } finally {
      // Always reset the flag
      this.isUpdatingContent = false;
    }
  }

  onDescriptionChange(event: { html: string }) {
    // Only update Quill if not already updating
    if (!this.isUpdatingContent && this.quillInstance) {
      try {
        this.isUpdatingContent = true;

        // Directly set HTML content using clipboard method
        this.quillInstance.clipboard.dangerouslyPasteHTML(event.html);
      } catch (error) {
        this._toast.error('Could not set description');
      } finally {
        this.isUpdatingContent = false;
      }
    }
  }

  submit() {
    if (this.equipmentForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }

    const formValues = {
      equipmentCategoryIds: this.selectedCategories(),
      ...this.equipmentForm.value,
    };

    this._equipmemntService.update(this.equipmentId(), formValues).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error) => {
        this._toast.error('An error occurred while updating equipment');
      },
    });
  }

  cancel() {
    this._location.back();
  }
  ngOnDestroy() {
    // Clean up Quill change handler
    if (this.quillChangeHandler) {
      this.quillChangeHandler();
      this.quillChangeHandler = null;
    }
  }
}
