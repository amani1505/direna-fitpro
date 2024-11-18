import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClickOutsideDirective } from '@directive/click-outside.directive';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, RouterLink],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
