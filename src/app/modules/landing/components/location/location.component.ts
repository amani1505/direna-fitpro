import { AfterViewInit, Component } from '@angular/core';
import { MapComponent } from '@components/map/map.component';

@Component({
  selector: 'Location',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  locationInfo = {
    address: '123 Fitness Street, Healthy City, Country',
    hours: '6 AM to 10 PM, Monday to Saturday',
    email: 'contact@direnafitpro.com',
    phone: '+1 234 567 8900',
  };
}
