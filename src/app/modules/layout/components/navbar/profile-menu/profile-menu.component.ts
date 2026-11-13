import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClickOutsideDirective } from '@directive/click-outside.directive';

@Component({
  selector: 'app-profile-menu',
  imports: [ClickOutsideDirective, NgClass, RouterLink],
  templateUrl: './profile-menu.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent {
  public isMenuOpen = false;

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
