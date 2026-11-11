import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../../../../../constant/blog-posts';

@Component({
    selector: 'BlogCard',
    imports: [RouterLink, DatePipe],
    templateUrl: './blog-card.component.html',
    styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: BlogPost;
}
