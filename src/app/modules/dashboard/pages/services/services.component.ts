import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ServicesPageviewComponent } from '@modules/dashboard/page-sections/services-pageview/services-pageview.component';

@Component({
  selector: 'app-services',
  imports: [ServicesPageviewComponent],
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './services.component.scss',
})
export class ServicesComponent {}
