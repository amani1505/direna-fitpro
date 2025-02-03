import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { NormalSelectComponent } from '@components/select/normal-select/normal-select.component';
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
    NgClass
  ],
  templateUrl: './create-equipmemnt-pageview.component.html',
  styleUrl: './create-equipmemnt-pageview.component.scss',
})
export class CreateEquipmemntPageviewComponent {
  private readonly _formBuilder = inject(FormBuilder);

  options = [
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

  equipmentForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    isPublished: ['', Validators.required],
    model: ['', Validators.required],
    serial_number: ['', Validators.required],
    purchase_date: ['', Validators.required],
    price: [1, Validators.required],
    quantity: [1, Validators.required],
    status: ['', Validators.required],
    used_for: ['', Validators.required],
  });
}
