import { Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

export default [
  {
    path: '',
    data: { title: 'Blogs' },
    component: BlogComponent,
    children: [
      {
        path: '',
        data: { title: 'Blogs' },
        loadComponent: () =>
          import('./all-blogs/all-blogs.component').then(
            (c) => c.AllBlogsComponent,
          ),
      },
      {
        path: ':id',
        data: { title: 'Read Blog' },
        loadComponent: () =>
          import('./single-blog/single-blog.component').then(
            (c) => c.SingleBlogComponent,
          ),
      },
    ],
  },
] as Routes;
