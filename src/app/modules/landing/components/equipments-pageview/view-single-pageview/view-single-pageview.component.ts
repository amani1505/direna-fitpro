import { DecimalPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { Component, computed, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RevealDirective } from '@directive/reveal.directive';
import { Files } from '@model/files';
import { AuthService } from '@service/auth.service';
import { CartService } from '@service/modules/cart.service';
import { EquipmentService } from '@service/modules/equipment.service';
import { WishlistService } from '@service/modules/wishlist.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';
import { QuillModule } from 'ngx-quill';

@Component({
    selector: 'view-single-pageview',
    imports: [NgClass, DecimalPipe, AngularSvgIconModule, QuillModule, RouterLink, RevealDirective],
    templateUrl: './view-single-pageview.component.html',
    styleUrl: './view-single-pageview.component.scss'
})
export class ViewSinglePageviewComponent implements OnInit {
  private _equipmentsService = inject(EquipmentService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _cartService = inject(CartService);
  private _wishlistService = inject(WishlistService);
  private _toastService = inject(ToastService);
  private _authService = inject(AuthService);
  private _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  fileUrl = environment.staicUrl;
  equipment = computed(() => this._equipmentsService.equipment());
  private loading = this._equipmentsService.loading;
  private requestedId = signal<string | null>(null);

  /** The service keeps the last viewed item, so wait until it matches this page. */
  ready = computed(() => !this.loading() && String(this.equipment()?.id) === this.requestedId());
  /** The request finished but did not return this item. */
  notFound = computed(() => this.requestedId() !== null && !this.loading() && !this.ready());

  private cart = toSignal(this._cartService.cart$, { initialValue: null });
  private wishlist = toSignal(this._wishlistService.wishlist$, { initialValue: null });

  inCart = computed(() => (this.cart()?.items ?? []).some((item) => item.equipment?.id === this.equipment()?.id));
  inWishlist = computed(() => (this.wishlist() ?? []).some((item) => item.equipment?.id === this.equipment()?.id));

  selectedImage = signal<Files | null>(null);
  adding = signal(false);
  copied = signal(false);
  animationClass = '';
  private currentIndex = 0;

  constructor() {
    effect(
      () => {
        const files = this.equipment()?.files ?? [];
        this.currentIndex = 0;
        this.selectedImage.set(files.length > 0 ? files[0] : null);
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.requestedId.set(id);
    this._equipmentsService.findOne(id, ['files']);
  }

  selectImage(image: Files): void {
    const newIndex = this.equipment().files.indexOf(image);
    if (newIndex === this.currentIndex) return;

    this.animationClass = newIndex > this.currentIndex ? 'animate-slide-left' : 'animate-slide-right';
    this.currentIndex = newIndex;
    this.selectedImage.set(image);
    setTimeout(() => (this.animationClass = ''), 500);
  }

  /** Cart and wishlist need an account; send guests to sign in first. */
  private requireSignIn(): boolean {
    if (this._authService.authenticated()) return false;
    this._toastService.error('Sign in to save items and add them to your cart.');
    this._router.navigate(['/auth'], { queryParams: { redirectURL: this._router.url } });
    return true;
  }

  addToCart() {
    if (this.requireSignIn() || this.adding()) return;
    this.adding.set(true);
    this._cartService.addToCart(this.equipment().id, 1).subscribe({
      next: () => {
        this.adding.set(false);
        this._toastService.success('Added to your cart.');
      },
      error: (error) => {
        this.adding.set(false);
        this._toastService.error(error?.error?.message || error.message);
      },
    });
  }

  addToWishlist() {
    if (this.requireSignIn()) return;
    if (this.inWishlist()) {
      this._toastService.success('Already in your wishlist.');
      return;
    }
    this._wishlistService.addToWishlist(this.equipment().id).subscribe({
      next: () => this._toastService.success('Saved to your wishlist.'),
      error: (error) => this._toastService.error(error?.error?.message || error.message),
    });
  }

  async share(title: string): Promise<void> {
    if (!this._isBrowser) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // The person closed the share sheet; nothing to do.
    }
  }
}
