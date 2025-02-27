import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Files } from '@model/files';
import { EquipmentService } from '@service/modules/equipment.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';
import { QuillModule } from 'ngx-quill';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
}

@Component({
  selector: 'view-single-pageview',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, QuillModule],
  templateUrl: './view-single-pageview.component.html',
  styleUrl: './view-single-pageview.component.scss',
})
export class ViewSinglePageviewComponent implements OnInit {
  private _equipmentsService = inject(EquipmentService);
  private _route = inject(ActivatedRoute);

  equipment = computed(() => this._equipmentsService.equipment());
  fileUrl = environment.staicUrl;

  currentIndex: number = 0;
  quatity: number = 0;
  available: number = 12;
  animationClass: string = '';
  colors: string[] = ['#FF5722', '#F44336', '#4CAF50', '#2196F3']; // Define colors here
  selectedColor: string = this.colors[0];
  icons: string[] = [
    './assets/icons/ionicons/logo-facebook.svg',
    './assets/icons/ionicons/logo-twitter.svg',
    '/assets/icons/ionicons/logo-instagram.svg',
    './assets/icons/ionicons/logo-linkedin.svg',
  ];
  product: Product = {
    id: 1,
    name: 'Product Name',
    description: 'Product description goes here.',
    price: 99.99,
    images: [
      { url: '../../../../../assets/images/products/jacket-3.jpg' },
      { url: '../../../../../assets/images/products/jacket-4.jpg' },
      { url: '../../../../../assets/images/products/shirt-1.jpg' },
      // Add more images as needed
    ],
  };

  // selectedImage: Files | null = null;

  selectedImage = signal<Files | null>(null);

  constructor() {
    effect(
      () => {
        const eq = this.equipment();
        if (eq.files && eq.files.length > 0) {
          this.selectedImage.set(eq.files[0]); // Set the first image as selected
        } else {
          this.selectedImage.set(null); // Reset if no files are available
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this._equipmentsService.findOne(id, ['files']);
  }

  selectImage(image: Files): void {
    const newIndex = this.equipment().files.indexOf(image);

    if (newIndex === this.currentIndex) {
      return;
    }

    if (newIndex > this.currentIndex) {
      this.animationClass = 'animate-slide-left';
    } else {
      this.animationClass = 'animate-slide-right';
    }

    this.currentIndex = newIndex;
    this.selectedImage.set(image);

    setTimeout(() => {
      this.animationClass = '';
    }, 500);
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  add() {
    if (this.equipment().quantity > this.quatity) {
      ++this.quatity;
    }
  }

  decrease() {
    if (this.quatity > 0) {
      --this.quatity;
    }
  }
}
