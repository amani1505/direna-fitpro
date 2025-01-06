import { Component } from '@angular/core';
import { ServicesPageviewComponent } from '@modules/dashboard/page-sections/services-pageview/services-pageview.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServicesPageviewComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {}
