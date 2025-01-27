import { Component } from '@angular/core';
import { CreateClassPageviewComponent } from '@modules/dashboard/page-sections/class-pageview/create-class-pageview/create-class-pageview.component';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CreateClassPageviewComponent],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss',
})
export class CreateClassComponent {}
