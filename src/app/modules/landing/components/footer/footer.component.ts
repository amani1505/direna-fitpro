import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CONTACT_INFO } from '../../../../constant/contact';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AngularSvgIconModule,RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  readonly contact = CONTACT_INFO;
}
