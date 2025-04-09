import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LayoutComponent } from './layout/layout.component';
import { SearchDropdownComponent } from '@components/search-dropdown/search-dropdown.component';
import { EquipmentService } from '@service/modules/equipment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '@service/modules/cart.service';
import { Cart } from '@model/cart.interface';
import { DropdownConfig, DropdownSection } from '@model/dropdown';
import { AuthService } from '@service/auth.service';
import { MenuPopupComponent } from '@components/menu-popup/menu-popup.component';

@Component({
  selector: 'equipments-pageview',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    LayoutComponent,
    SearchDropdownComponent,
    RouterLink,
     MenuPopupComponent,
  ],
  templateUrl: './equipments-pageview.component.html',
  styleUrl: './equipments-pageview.component.scss',
})
export class EquipmentsPageviewComponent implements OnInit {
  cart = signal<Cart | null>(null);
  private _equipmentsService = inject(EquipmentService);
  private _authService = inject(AuthService);
  private _cartService = inject(CartService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  equipemnts = computed(() => this._equipmentsService.equipments()?.data || []);
  loading = this._equipmentsService.loading;

  currentRoute: string = '';
  isAuthenticated =this._authService.authenticated

  ngOnInit(): void {
    this._cartService.cart$.subscribe((cart) => {
      this.cart.set(cart);
    });

    this.currentRoute = this._router.url;

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
          label: 'Dashboard',
          hide: !this.isAuthenticated(),
          icon: './assets/icons/heroicons/solid/chart-pie.svg',
          action: () => this._router.navigateByUrl(`/dashboard`),
        },
        {
          label: 'Profile',
          hide: !this.isAuthenticated(),
          icon: './assets/icons/heroicons/outline/user-circle.svg',
          action: () => this._router.navigateByUrl(`/dashboard/profile`),
        },

        {
          label: 'Sign in',
          hide: this.isAuthenticated(),
          icon: './assets/icons/heroicons/outline/lock-closed.svg',
          action: () =>
            this._router.navigateByUrl(`auth?redirectURL=${this.currentRoute}`),
        },
        {
          label: 'Sign out',
          icon: './assets/icons/heroicons/outline/logout.svg',
          hide: !this.isAuthenticated(),
          action: () =>
            this._router.navigateByUrl(`signout?redirectURL=${this.currentRoute}`),
        },
      ],
    },
  ];

  onSearch(query: string): void {
    this._equipmentsService.findAll({
      filterBy: 'title',
      search: query,
      relations: ['files'],
      withPagination: false,
    });
  }
  navigateTo(id: string) {
    this._router.navigate([id], { relativeTo: this._route });
  }
}
