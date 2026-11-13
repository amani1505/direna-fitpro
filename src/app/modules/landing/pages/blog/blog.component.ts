import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [RouterOutlet],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blog.component.scss',
})
export class BlogComponent {}
