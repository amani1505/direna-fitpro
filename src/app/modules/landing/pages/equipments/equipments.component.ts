import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { CartService } from '@service/modules/cart.service';
import { WishlistService } from '@service/modules/wishlist.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { filter, map, startWith } from 'rxjs';

type ShopView = 'list' | 'item' | 'cart';

const HEADINGS: Record<ShopView, { title: string; text: string }> = {
  list: {
    title: 'Gear up for every goal',
    text: 'Equipment for training at home or in the gym, picked by our coaches.',
  },
  item: {
    title: 'Equipment details',
    text: 'Photos, price and everything you need to know before you buy.',
  },
  cart: {
    title: 'Your cart',
    text: 'Check your items and quantities, then place your order.',
  },
};

@Component({
  selector: 'app-equipments',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AngularSvgIconModule],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  readonly isAuthenticated = this.auth.authenticated;

  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly view = computed<ShopView>(() => {
    const path = (this.currentUrl() ?? '').split(/[?#]/)[0].replace(/\/+$/, '');
    if (path.endsWith('/equipments/cart')) return 'cart';
    if (/\/equipments\/[^/]+$/.test(path)) return 'item';
    return 'list';
  });

  readonly heading = computed(() => HEADINGS[this.view()]);

  private readonly cart = toSignal(this.cartService.cart$, { initialValue: null });
  private readonly wishlist = toSignal(this.wishlistService.wishlist$, { initialValue: null });

  readonly cartCount = computed(() => this.cart()?.items?.length ?? 0);
  readonly wishlistCount = computed(() => this.wishlist()?.length ?? 0);
}
