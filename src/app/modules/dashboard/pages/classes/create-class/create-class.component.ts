import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CreateClassPageviewComponent } from '@modules/dashboard/page-sections/class-pageview/create-class-pageview/create-class-pageview.component';

@Component({
  selector: 'app-create-class',
  imports: [CreateClassPageviewComponent],
  templateUrl: './create-class.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-class.component.scss',
})
export class CreateClassComponent {}
