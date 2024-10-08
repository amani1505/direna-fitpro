import { Component } from '@angular/core';
import { HeroComponent } from '@modules/landing/components/home/hero/hero.component';
import { AboutComponent } from '@modules/landing/components/home/about/about.component';
import { BlogComponent } from '@modules/landing/components/home/blog/blog.component';
import { ClassComponent } from '@modules/landing/components/home/class/class.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, BlogComponent,ClassComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
