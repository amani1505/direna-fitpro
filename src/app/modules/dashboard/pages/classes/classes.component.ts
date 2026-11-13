import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClassPageviewComponent } from '@modules/dashboard/page-sections/class-pageview/class-pageview.component';

@Component({
  selector: 'app-classes',
  imports: [ClassPageviewComponent],
  templateUrl: './classes.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './classes.component.scss',
})
export class ClassesComponent {}
