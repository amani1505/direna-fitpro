import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RowColumn } from '@model/TableColumn.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[app-table-row]',
  standalone: true,
  imports: [FormsModule, AngularSvgIconModule, CommonModule],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class RowComponent {
  @Input() data: any;
  @Input() hasImage: boolean = false;
  @Input() columns: Array<RowColumn> = [];

  @Output() onDelete = new EventEmitter<void>();
  @Output() onView = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();

  constructor() {}

  getIconForAction(action: string): string {
    switch (action) {
      case 'view':
        return 'assets/icons/heroicons/outline/eye.svg';
      case 'update':
        return 'assets/icons/heroicons/outline/pencil.svg';
      case 'delete':
        return 'assets/icons/heroicons/outline/trash.svg';
      default:
        return '';
    }
  }

  delete() {
    this.onDelete.emit();
  }

  update() {
    this.onUpdate.emit();
  }
  view() {
    this.onView.emit();
  }

  getActions(action: string) {
    switch (action) {
      case 'view':
        return this.view();
      case 'update':
        return this.update();
      case 'delete':
        return this.delete();
      default:
        return '';
    }
  }
}
