import { NgClass, Location } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
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
export class UpdateEquipmemntPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _equipmemntService = inject(EquipmentService);
  private _equipmentCategoryService = inject(EquipmemntCategoryService);
  private _toast = inject(ToastService);
  private _route = inject(ActivatedRoute);

  private quillInstance: Quill | null = null;
  // Environment configuration
  fileUrl = environment.staicUrl;

  // Image constraints
  readonly MAX_IMAGES = 10;
  readonly MIN_IMAGES = 4;

  private _location = inject(Location);

  // Computed signals for categories and equipment
  categories = computed(
    () => this._equipmentCategoryService.allEquipmentCategories() || [],
  );

  equipment = computed(() => this._equipmemntService.equipment());
  createLoading = this._equipmentCategoryService.loading;

  // Predefined status and usage options
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

  // Signals to manage form state
  selectedCategories = signal<Array<string>>([]);
  selectedStatus = signal<string>('');
  selectedUsedFor = signal<string>('');

  // Signal for managing selected images (initialized with 4 null slots)
  selectedImages = signal<Files[]>(new Array(this.MIN_IMAGES).fill(null));

  // Array to manage image uploader slots
  imageUploaders: number[] = [0, 1, 2, 3];

  // Signal to store current equipment ID
  equipmentId = signal<string>('');

  // Reactive form group
  equipmentForm: FormGroup;

  constructor() {
    // Initialize the form with validators
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

    // Effect to populate form when equipment data is loaded
    effect(
      () => {
        const equipment = this.equipment();

        if (equipment) {
          this.equipmentForm.get('description').setValue(equipment.description);
          const formattedPurchaseDate = this.formatDateForInput(equipment.purchase_date);
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

          // Set selected categories
          this.selectedCategories.set(
            equipment.categories?.map((category) => category.id),
          );

          // Set selected status and used for
          this.selectedStatus.set(equipment.status || '');
          this.selectedUsedFor.set(equipment.used_for || '');

          // Set selected images
          this.selectedImages.set(equipment.files || null);

          if (this.quillInstance) {
            this.quillInstance.root.innerHTML = equipment.description;
          }
        }
      },
      { allowSignalWrites: true },
    );
  }
  private formatDateForInput(isoDate: string): string {
    if (!isoDate) return ''; // Handle empty or invalid dates
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    // Get equipment ID from route
    const id = this._route.snapshot.paramMap.get('id');
    this.equipmentId.set(id);

    // Fetch equipment categories
    this._equipmentCategoryService.getAllEquipmentCategory();

    // Fetch specific equipment details with related files and categories
    this._equipmemntService.findOne(id, ['files', 'categories']);
  }

  // Method to check if more image uploaders can be added
  canAddMoreImages(): boolean {
    return this.imageUploaders.length < this.MAX_IMAGES;
  }

  // Method to check if an uploader can be removed
  canRemoveUploader(index: number): boolean {
    return this.imageUploaders.length > this.MIN_IMAGES;
  }

  // Add a new image uploader
  addImageUploader(): void {
    if (this.canAddMoreImages()) {
      const newIndex = this.imageUploaders.length;
      this.imageUploaders.push(newIndex);
      this.selectedImages()[newIndex] = null;
    } else {
      this._toast.warning(`Maximum of ${this.MAX_IMAGES} images allowed`);
    }
  }

  // Remove an image uploader
  removeImageUploader(index: number): void {
    if (this.canRemoveUploader(index)) {
      // Remove the uploader at this index
      this.imageUploaders.splice(index, 1);
      this.selectedImages().splice(index, 1);

      // Reassign indices to match array positions
      this.imageUploaders = this.imageUploaders.map((_, i) => i);
    } else {
      this._toast.warning(`Minimum of ${this.MIN_IMAGES} images required`);
    }
  }

  // Transform categories for multi-select
  transformToMultiSelectOptions = (
    apiData: Array<any>,
  ): Array<{ label: string; value: string }> => {
    return apiData.map((item) => ({
      label: item.category_name,
      value: item.id,
    }));
  };

  // Select categories
  selectCategory(ids: any) {
    this.selectedCategories.set(ids);
  }

  // Select status
  selectStatus(status: string) {
    this.selectedStatus.set(status);
    this.equipmentForm.patchValue({
      status: status,
    });
  }

  // Select used for
  selectUsedFor(status: string) {
    this.selectedUsedFor.set(status);
    this.equipmentForm.patchValue({
      used_for: status,
    });
  }

  // Handle image selection
  onImageSelected(event: any, index: number) {
    if (event) {
      this.selectedImages()[index] = event;
    } else {
      this.selectedImages().splice(index, 1);
    }
  }

  // Get count of valid images
  getValidImageCount(): number {
    return this.selectedImages().filter((img) => img !== null).length;
  }

  onEditorCreated(quill: Quill) {
    this.quillInstance = quill;

    const currentDescription = this.equipmentForm.get('description').value;
    if (currentDescription) {
      quill.root.innerHTML = currentDescription;
    }
  }

  onDescriptionChange(event: any) {
    this.equipmentForm.get('description').setValue(event.html);
  }

  // Submit form
  submit() {
    if (this.equipmentForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }

    const formValues = {
      equipmentCategoryIds: this.selectedCategories(),
      ...this.equipmentForm.value,
      images: this.selectedImages().filter((img) => img !== null),
    };

    this._equipmemntService.update(this.equipmentId(), formValues).subscribe({
      next: () => {
        this._toast.success('Equipment updated successfully');
        this.cancel();
      },
      error: (error) => {
        console.error('Update error:', error);
        this._toast.error('An error occurred while updating equipment');
      },
    });
  }

  // Cancel and go back
  cancel() {
    this._location.back();
  }
}
