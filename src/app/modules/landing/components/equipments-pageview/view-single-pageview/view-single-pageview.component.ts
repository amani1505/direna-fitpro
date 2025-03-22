import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { MenuPopupComponent } from '@components/menu-popup/menu-popup.component';
import { Cart } from '@model/cart.interface';
import { DropdownConfig, DropdownSection } from '@model/dropdown';
import { Files } from '@model/files';
import { AuthService } from '@service/auth.service';
import { CartService } from '@service/modules/cart.service';
import { EquipmentService } from '@service/modules/equipment.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';
import { QuillModule } from 'ngx-quill';
import { filter } from 'rxjs';

@Component({
  selector: 'view-single-pageview',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    QuillModule,
    RouterModule,
    MenuPopupComponent,
  ],
  templateUrl: './view-single-pageview.component.html',
  styleUrl: './view-single-pageview.component.scss',
})
export class ViewSinglePageviewComponent implements OnInit {
  cart = signal<Cart | null>(null);
  private _equipmentsService = inject(EquipmentService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _cartService = inject(CartService);
  private _toastService = inject(ToastService);
  private _authService = inject(AuthService);

  equipment = computed(() => this._equipmentsService.equipment());
  fileUrl = environment.staicUrl;

  currentIndex: number = 0;
  quantity: number = 0;
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

  selectedImage = signal<Files | null>(null);

  currentRoute: string = '';

  isAuthenticated = this._authService.authenticated;

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

    this._cartService.cart$.subscribe((cart) => {
      this.cart.set(cart);
    });

    // Get the initial route
    this.currentRoute = this._router.url;

    // Subscribe to route changes
    // this._router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     this.currentRoute = event.url; // Update the current route
    //     console.log('Current Route:', this.currentRoute);
    //   });
  }

  profileConfig: DropdownConfig = {
    triggerType: 'icon',
    width: 'w-56',
    position: 'right',
    animation: 'fade',
  };

  profileSections: DropdownSection[] = [
    {
      items: [
        {
          label: 'Profile',
          icon: './assets/icons/heroicons/outline/user-circle.svg',
          action: () => this._router.navigateByUrl(`/profile`),
        },
        {
          label: 'Sign in',
          disabled: this.isAuthenticated(),
          icon: './assets/icons/heroicons/outline/lock-closed.svg',
          action: () =>
            this._router.navigateByUrl(`auth?redirectURL=${this.currentRoute}`),
        },
        {
          label: 'Sign out',
          icon: './assets/icons/heroicons/outline/logout.svg',
          disabled: !this.isAuthenticated(),
          action: () =>
            this._router.navigateByUrl(`signout?redirectURL=${this.currentRoute}`),
        },
      ],
    },
  ];

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
    if (this.equipment().quantity > this.quantity) {
      ++this.quantity;
    }
  }

  decrease() {
    if (this.quantity > 0) {
      --this.quantity;
    }
  }

  addToCart() {
    this._cartService.addToCart(this.equipment().id, 1).subscribe({
      next: (cart) => {
        this.cart.set(cart);
      },
      error: (error) => {
        this._toastService.error(error.message);
      },
    });
  }

  goToYouCart(){
    this._router.navigateByUrl('/equipments/cart');
  }
}
