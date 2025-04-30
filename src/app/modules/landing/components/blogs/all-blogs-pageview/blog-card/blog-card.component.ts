import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'BlogCard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  @Input() blog: any;
  @Input() large: boolean = false;
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  view(id: string) {
    this._router.navigate([id], {
      relativeTo: this._route,
    });
  }
}
