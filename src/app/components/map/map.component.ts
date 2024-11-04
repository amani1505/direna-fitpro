import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'Map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @Input() latitude: number = 40.712776;
  @Input() longitude: number = -74.005974;
  @Input() zoom: number = 13;

  private map: any;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  private async initMap(): Promise<void> {
    // Dynamically import Leaflet only on the client side
    const L = await import('leaflet');

    this.map = L.map(this.el.nativeElement.querySelector('div')).setView(
      [this.latitude, this.longitude],
      this.zoom,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(
      this.map,
    );

    L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
}
