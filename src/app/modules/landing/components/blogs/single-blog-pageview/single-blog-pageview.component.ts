import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RevealDirective } from '@directive/reveal.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { map } from 'rxjs';
import { BLOG_POSTS, findBlogPost } from '../../../../../constant/blog-posts';
import { BlogCardComponent } from '../all-blogs-pageview/blog-card/blog-card.component';

@Component({
  selector: 'single-blog-pageview',
  standalone: true,
  imports: [RouterLink, DatePipe, RevealDirective, AngularSvgIconModule, BlogCardComponent],
  templateUrl: './single-blog-pageview.component.html',
  styleUrl: './single-blog-pageview.component.scss',
})
export class SingleBlogPageviewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Follows the :id param so moving between posts updates the page. */
  private readonly id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: this.route.snapshot.paramMap.get('id'),
  });

  readonly post = computed(() => findBlogPost(this.id()));
  readonly more = computed(() => BLOG_POSTS.filter((p) => p.id !== this.id()).slice(0, 3));
  readonly copied = signal(false);

  async share(title: string): Promise<void> {
    if (!this.isBrowser) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // The person closed the share sheet; nothing to do.
    }
  }
}
