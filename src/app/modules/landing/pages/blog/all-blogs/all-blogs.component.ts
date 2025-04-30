import { Component } from '@angular/core';
import { AllBlogsPageviewComponent } from '@modules/landing/components/blogs/all-blogs-pageview/all-blogs-pageview.component';

@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [AllBlogsPageviewComponent],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.scss',
})
export class AllBlogsComponent {}
