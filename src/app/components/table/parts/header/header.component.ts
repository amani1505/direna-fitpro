import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { HeaderColumn } from '@model/TableColumn.interface';

@Component({
  selector: '[app-table-header]',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() columns: HeaderColumn[] = [];
  @Input() isAllSelected: boolean = false;
  @Output() onCheckAll = new EventEmitter<boolean>();

  toggle(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.onCheckAll.emit(value);
  }
}
