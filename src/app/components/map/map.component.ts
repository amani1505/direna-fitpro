import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'Map',
  imports: [],
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input() latitude = 40.712776;
  @Input() longitude = -74.005974;
  @Input() zoom = 13;
  /** CSS height of the map, e.g. '400px' or '100%'. */
  @Input() height = '400px';

  private map: any;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  private async initMap(): Promise<void> {
    // Dynamically import Leaflet only on the client side
    const L = await import('leaflet');

    // OpenStreetMap tiles stop at zoom 19.
    const zoom = Math.min(Math.max(this.zoom, 1), 19);

    this.map = L.map(this.el.nativeElement.querySelector('div'), {
      scrollWheelZoom: false,
    }).setView([this.latitude, this.longitude], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Custom pulsing pin (styled in map.component.scss); avoids Leaflet's
    // default marker images, which often fail to resolve in Angular builds.
    const pin = L.divIcon({
      className: 'map-pin',
      html: '<span class="map-pin-pulse"></span><span class="map-pin-dot"></span>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
    L.marker([this.latitude, this.longitude], { icon: pin }).addTo(this.map);
  }
}
