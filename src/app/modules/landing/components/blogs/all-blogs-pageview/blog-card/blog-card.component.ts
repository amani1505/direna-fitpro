import { DatePipe } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../../../../../constant/blog-posts';

@Component({
  selector: 'BlogCard',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: BlogPost;
}
