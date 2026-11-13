import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { SubMenuItem } from '@model/menu.model';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'div[navbar-submenu]',
  imports: [
    NgTemplateOutlet,
    RouterLinkActive,
    RouterLink,
    AngularSvgIconModule,
  ],
  templateUrl: './navbar-submenu.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar-submenu.component.scss',
})
export class NavbarSubmenuComponent {
  @Input() public submenu = {} as SubMenuItem[];

}
