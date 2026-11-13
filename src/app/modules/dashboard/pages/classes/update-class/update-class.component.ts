import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UpdateClassPageviewComponent } from '@modules/dashboard/page-sections/class-pageview/update-class-pageview/update-class-pageview.component';

@Component({
  selector: 'app-update-class',
  imports: [UpdateClassPageviewComponent],
  templateUrl: './update-class.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './update-class.component.scss',
})
export class UpdateClassComponent {}
