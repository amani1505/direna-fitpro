import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SingleBlogPageviewComponent } from '@modules/landing/components/blogs/single-blog-pageview/single-blog-pageview.component';

@Component({
  selector: 'app-single-blog',
  imports: [SingleBlogPageviewComponent],
  templateUrl: './single-blog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './single-blog.component.scss',
})
export class SingleBlogComponent {}
