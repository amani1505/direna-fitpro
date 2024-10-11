import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}
