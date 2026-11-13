import {
  Component,
  EventEmitter,
  Input,
  Output,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActionsComponent } from './parts/actions/actions.component';
import { FooterComponent } from './parts/footer/footer.component';
import { RowComponent } from './parts/row/row.component';
import { HeaderComponent } from './parts/header/header.component';
import {
  HeaderColumn,
  RowColumn,
  TableActions,
  TableRow,
} from '@model/TableColumn.interface';
import { ModalComponent } from '@components/modal/modal.component';

@Component({
  selector: 'ListTable',
  imports: [
    FormsModule,
    ActionsComponent,
    FooterComponent,
    HeaderComponent,
    RowComponent,
    ModalComponent,
  ],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) totalTitle!: string;
  @Input({ required: true }) totalValue!: number;
  @Input({ required: true }) buttonLabel!: string;
  @Input({ required: true }) deleteContent!: string;
  @Input({ required: true }) deleteSubContent!: string;
  @Input({ required: true }) actions: TableActions[] = [];
  @Input({ required: true }) data: TableRow[] = [];
  @Input({ required: true }) headerColumns: HeaderColumn[] = [];
  @Input({ required: true }) rowColumns: RowColumn[] = [];
  @Input({ required: true }) itemsPerPage = 10;
  @Input({ required: true }) totalItems = 100;
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) totalPages = 10;
  isModalOpen = input.required<boolean>();
  // Outputs
  @Output() onAdd = new EventEmitter<void>();
  @Output() onCheckAll = new EventEmitter<boolean>();
  @Output() onCheck = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() openDeleteModal = new EventEmitter<string>();
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() onView = new EventEmitter<string>();
  @Output() onUpdate = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  selectedAll = false;

  get colSpans(): number {
    return this.headerColumns.length;
  }

  toggleAll(checked: boolean) {
    this.selectedAll = checked;
    this.data.forEach((row) => (row.selected = checked));
    this.onCheckAll.emit(checked);
  }
  toggle(checked: boolean, row: TableRow) {
    row.selected = checked;
    this.selectedAll = this.data.every((r) => r.selected);
    this.onCheck.emit(checked);
  }

  deleteModal(id: string) {
    this.openDeleteModal.emit(id);
  }
  delete() {
    this.onDelete.emit();
  }

  update(id: string) {
    this.onUpdate.emit(id);
  }
  view(id: string) {
    this.onView.emit(id);
  }

  add() {
    this.onAdd.emit();
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPageChange.emit(itemsPerPage);
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
}
