import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss',
})
export class BottomNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
