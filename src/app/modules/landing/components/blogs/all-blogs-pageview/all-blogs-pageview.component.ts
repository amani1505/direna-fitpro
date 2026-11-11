import { DatePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '@directive/reveal.directive';
import { BLOG_POSTS } from '../../../../../constant/blog-posts';
import { BlogCardComponent } from './blog-card/blog-card.component';

@Component({
  selector: 'all-blogs-pageview',
  standalone: true,
  imports: [BlogCardComponent, RouterLink, DatePipe, RevealDirective],
  templateUrl: './all-blogs-pageview.component.html',
  styleUrl: './all-blogs-pageview.component.scss',
})
export class AllBlogsPageviewComponent {
  /** Newest post is featured; the rest go in the grid. */
  private readonly sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  readonly featured = this.sorted[0];
  private readonly rest = this.sorted.slice(1);

  readonly topics = ['All', ...new Set(this.rest.map((post) => post.category))];
  readonly activeTopic = signal('All');

  readonly visible = computed(() => {
    const topic = this.activeTopic();
    return topic === 'All' ? this.rest : this.rest.filter((post) => post.category === topic);
  });
}
