import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { SubMenuItem } from '@model/menu.model';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'div[navbar-submenu]',
  standalone: true,
  imports: [
    NgFor,
    NgTemplateOutlet,
    RouterLinkActive,
    RouterLink,
    NgIf,
    AngularSvgIconModule,
  ],
  templateUrl: './navbar-submenu.component.html',
  styleUrl: './navbar-submenu.component.scss',
})
export class NavbarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem[]>{};

  constructor() {}

  ngOnInit(): void {}
}
