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
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelectComponent } from '@components/select/multi-select/multi-select.component';
import { NormalSelectComponent } from '@components/select/normal-select/normal-select.component';
import { ClassesService } from '@service/modules/classes.service';
import { StaffService } from '@service/modules/staff.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
@Component({
  selector: 'update-class-pageview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectComponent,
    AngularSvgIconModule,
    NormalSelectComponent,
  ],
  templateUrl: './update-class-pageview.component.html',
  styleUrl: './update-class-pageview.component.scss',
})
export class UpdateClassPageviewComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _location = inject(Location);
  private _classesService = inject(ClassesService);
  private _staffService = inject(StaffService);
  private _toast = inject(ToastService);

  staffs = computed(() => this._staffService.allStaffs() || []);
  gymClass = computed(() => this._classesService.gymClass());

  loading = this._staffService.loading;
  classLoading = this._classesService.loading;

  dayOptions = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
  ];

  selectedStaff = signal<string[]>([]);
  selectedDay = signal<string>('');
  classId = signal<string>('');

  classForm: FormGroup;

  constructor() {
    this.classForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      day: ['', Validators.required],
      color: ['#ff4836'],
      capacity: [0, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });

    effect(
      () => {
        const gymClass = this.gymClass();

        if (gymClass) {
          this.classForm.patchValue({
            name: gymClass.name,
            description: gymClass.description,
            day: gymClass.day,
            color: gymClass.color,
            capacity: gymClass.capacity,
            startTime: gymClass.startTime,
            endTime: gymClass.endTime,
          });

          this.selectedStaff.set(
            gymClass.instructors?.map((instructor) => instructor.id),
          );

          this.selectedDay.set(gymClass.day || '');
        }
      },
      { allowSignalWrites: true }, //
    );
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.classId.set(id);
    this._staffService.getAllStaffs();

    this._classesService.findOne(id, ['instructors']);
  }

  transformToMultiSelectOptions = (
    apiData: Array<any>,
  ): Array<{ label: string; value: string }> => {
    return apiData.map((item) => ({
      label: item.fullname,
      value: item.id,
    }));
  };

  selectStaffs(ids: any) {
    this.selectedStaff.set(ids);
  }
  selectWeekDay(value: string) {
    this.selectedDay.set(value);
    this.classForm.patchValue({
      day: value,
    });
  }

  addNewTrainer() {
    this._router.navigate(['/admin/staffs/add']);
  }

  submit() {
    if (this.classForm.invalid) {
      this._toast.error('Please fill in all required fields');
      return;
    }

    const data = {
      staffIds: this.selectedStaff,
      ...this.classForm.value,
    };

    this._classesService
      .update(this.classId(),{
        name: data.name,
        description: data.description,
        day: data.day,
        color: data.color,
        capacity: data.capacity,
        startTime: data.startTime,
        endTime: data.endTime,
        staffIds: data.staffIds(),
      })
      .subscribe({
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
