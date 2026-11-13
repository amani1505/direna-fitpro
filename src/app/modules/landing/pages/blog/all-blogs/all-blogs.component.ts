import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AllBlogsPageviewComponent } from '@modules/landing/components/blogs/all-blogs-pageview/all-blogs-pageview.component';

@Component({
  selector: 'app-all-blogs',
  imports: [AllBlogsPageviewComponent],
  templateUrl: './all-blogs.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './all-blogs.component.scss',
})
export class AllBlogsComponent {}
