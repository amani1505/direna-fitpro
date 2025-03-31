import { Component } from '@angular/core';
import { HomePageSectionComponent } from '@modules/dashboard/page-sections/home-page-section/home-page-section.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HomePageSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {



}
