import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadCrumbsComponent } from "../../../../components/bread-crumbs/bread-crumbs.component";

@Component({
  selector: 'app-equipments',
  standalone: true,
  imports: [RouterOutlet, BreadCrumbsComponent],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {}
