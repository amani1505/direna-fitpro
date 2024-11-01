import { Component } from '@angular/core';
import { MapComponent } from '@components/map/map.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

}
