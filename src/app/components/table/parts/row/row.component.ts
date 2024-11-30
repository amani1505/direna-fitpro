import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[app-table-row]',
  standalone: true,
  imports: [FormsModule, AngularSvgIconModule,CommonModule],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class RowComponent {
  @Input() user: any = <any>{};

  constructor() {}
}
