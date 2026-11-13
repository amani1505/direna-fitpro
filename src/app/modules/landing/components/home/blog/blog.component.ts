import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '@directive/reveal.directive';
import { BLOG_POSTS } from '../../../../../constant/blog-posts';

@Component({
  selector: 'blog',
  imports: [RevealDirective, RouterLink, DatePipe],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  /** The three newest posts. */
  readonly blogs = [...BLOG_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
}
