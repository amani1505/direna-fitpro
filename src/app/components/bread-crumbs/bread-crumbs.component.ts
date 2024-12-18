import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Breadcrumb } from '@model/breadcrumbs.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { filter, interval, Subscription } from 'rxjs';

@Component({
  selector: 'BreadCrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularSvgIconModule],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.scss',
})
export class BreadCrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  currentUrl: string = '';
  currentDateTime: string = '';

  private timeUpdateTimer: any;
  private routerSubscription: Subscription | null = null;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    // Generate breadcrumbs on init to handle refresh cases
    this.generateBreadcrumbs();
    this.updateDateTime();

    // Start time update only on the client side
    this._ngZone.runOutsideAngular(() => {
      this.startTimeUpdate();
    });

    // Subscribe to navigation events to update breadcrumbs when navigating
    this.routerSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.generateBreadcrumbs();
        this.currentUrl = this._router.url;
      });
  }

  ngOnDestroy(): void {
    // Clear the timer
    if (this.timeUpdateTimer) {
      clearInterval(this.timeUpdateTimer);
    }

    // Unsubscribe from router events
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private startTimeUpdate(): void {
    // Only start time update if in browser environment
    if (typeof window !== 'undefined') {
      this.timeUpdateTimer = setInterval(() => {
        // Use NgZone to ensure change detection
        this._ngZone.run(() => {
          this.updateDateTime();
        });
      }, 1000);
    }
  }

  private updateDateTime(): void {
    this.currentDateTime = new Date().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

  private generateBreadcrumbs(): void {
    if (this._router.url === '/admin') {
      this.breadcrumbs = []; // Hide breadcrumbs on /admin
    } else {
      this.breadcrumbs = this.createBreadcrumbs(this._route.root);
    }
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      // Construct the full path, ensuring not to double append `/admin`
      const fullPath = routeURL ? `${url}/${routeURL}` : url;

      const routeData = child.snapshot.data;
      const title = routeData['title'] || routeURL;

      // Add the breadcrumb if it does not already exist
      if (!breadcrumbs.some((breadcrumb) => breadcrumb.url === fullPath)) {
        breadcrumbs.push({ label: routeURL, url: fullPath, title });
      }

      return this.createBreadcrumbs(child, fullPath, breadcrumbs);
    }

    return breadcrumbs;
  } 
}
