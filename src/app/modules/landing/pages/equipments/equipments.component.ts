import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadCrumbsComponent } from '@components/bread-crumbs/bread-crumbs.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-equipments',
  standalone: true,
  imports: [RouterOutlet, BreadCrumbsComponent, AngularSvgIconModule],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {}
