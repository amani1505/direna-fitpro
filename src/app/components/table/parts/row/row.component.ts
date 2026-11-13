import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RowColumn, TableRow } from '@model/TableColumn.interface';
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
  @Input({ required: true }) data!: TableRow;
  @Input() hasImage = false;
  @Input({ required: true }) index = 0;
  @Input() columns: RowColumn[] = [];

  @Output() onDelete = new EventEmitter<void>();
  @Output() onView = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();
  @Output() onCheck = new EventEmitter<{ checked: boolean; row: TableRow }>();

  /** The row's fields, looked up by column key. */
  private get record(): Record<string, unknown> {
    return this.data as unknown as Record<string, unknown>;
  }

  cell(key: string): unknown {
    return this.record[key];
  }

  cellText(key: string): string {
    const value = this.cell(key);
    return value === null || value === undefined ? '' : String(value);
  }

  cellDate(key: string): string | number | Date | null {
    const value = this.cell(key);
    return typeof value === 'string' || typeof value === 'number' || value instanceof Date ? value : null;
  }

  cellList(key: string): unknown[] {
    const value = this.cell(key);
    return Array.isArray(value) ? value : [];
  }

  /** Path of the first uploaded file, for image columns. */
  get firstFile(): string | null {
    const files = this.record['files'];
    const first = Array.isArray(files) ? files[0] : null;
    return first && typeof first.file_path === 'string' ? first.file_path : null;
  }

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
