import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { filter } from 'rxjs';

@Component({
  selector: 'BreadCrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularSvgIconModule],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.scss',
})
export class BreadCrumbsComponent {
  breadcrumbs: Array<{ label: string; url: string }> = [];
  currentUrl: string = ''; 

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Generate breadcrumbs on init to handle refresh cases
    this.breadcrumbs = this.createBreadcrumbs(this._route.root);

    // Subscribe to navigation events to update breadcrumbs when navigating
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this._route.root);
      this.currentUrl = this._router.url;
    });
  }


  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string }> = [],
  ): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        // Only add the label for subsequent breadcrumbs
        breadcrumbs.push({ label: routeURL, url });
      }

      // Recursively call for child routes
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
