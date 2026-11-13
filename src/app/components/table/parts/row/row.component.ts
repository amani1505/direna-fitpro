import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RowColumn } from '@model/TableColumn.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: '[table-row]',
  imports: [FormsModule, AngularSvgIconModule, CommonModule],
  templateUrl: './row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './row.component.scss',
})
export class RowComponent {
  fileUrl = environment.staicUrl;
  @Input() data: any;
  @Input() hasImage = false;
  @Input({ required: true }) index = 0;
  @Input() columns: RowColumn[] = [];

  @Output() onDelete = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onCheck = new EventEmitter<{ checked: boolean; row: any }>();

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

  handleAction(action: string) {
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
  toggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onCheck.emit({ checked, row: this.data });
  }
}
