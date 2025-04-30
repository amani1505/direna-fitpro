import { Component } from '@angular/core';
import { SingleBlogPageviewComponent } from '@modules/landing/components/blogs/single-blog-pageview/single-blog-pageview.component';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [SingleBlogPageviewComponent],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss',
})
export class SingleBlogComponent {}
