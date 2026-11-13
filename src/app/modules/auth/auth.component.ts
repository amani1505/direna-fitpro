import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeToggleComponent } from '@components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet,
    RouterLink,
    AngularSvgIconModule,
    ThemeToggleComponent,
  ],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
