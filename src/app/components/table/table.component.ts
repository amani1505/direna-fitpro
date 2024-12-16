import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionsComponent } from './parts/actions/actions.component';
import { FooterComponent } from './parts/footer/footer.component';
import { RowComponent } from './parts/row/row.component';
import { HeaderComponent } from './parts/header/header.component';
import {
  HeaderColumn,
  RowColumn,
  TableActions,
} from '@model/TableColumn.interface';
import { ModalComponent } from '@components/modal/modal.component';

@Component({
  selector: 'ListTable',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ActionsComponent,
    FooterComponent,
    HeaderComponent,
    RowComponent,
    ModalComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) totalTitle!: string;
  @Input({ required: true }) totalValue!: number;
  @Input({ required: true }) buttonLabel!: string;
  @Input({ required: true }) deleteContent!: string;
  @Input({ required: true }) deleteSubContent!: string;
  @Input({ required: true }) actions: Array<TableActions> = [];
  @Input({ required: true }) data: Array<any> = [];
  @Input({ required: true }) headerColumns: Array<HeaderColumn> = [];
  @Input({ required: true }) rowColumns: Array<RowColumn> = [];
  @Input({ required: true }) itemsPerPage: number = 10;
  @Input({ required: true }) totalItems: number = 100;
  @Input({ required: true }) currentPage: number = 1;
  @Input({ required: true }) totalPages: number = 10;
  isModalOpen = input.required<boolean>();
  // Outputs
  @Output() onAdd = new EventEmitter<void>();
  @Output() onCheckAll = new EventEmitter<boolean>();
  @Output() onCheck = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() openDeleteModal = new EventEmitter<void>();
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() onView = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  selectedAll: boolean = false;

  get colSpans(): number {
    return this.headerColumns.length;
  }

  toggleAll(checked: boolean) {
    this.selectedAll = checked;
    this.data.forEach((row) => (row.selected = checked));
    this.onCheckAll.emit(checked);
  }
  toggle(checked: boolean, row: any) {
    row.selected = checked;
    this.selectedAll = this.data.every((r) => r.selected);
    this.onCheck.emit(checked);
  }

  deleteModal(row: any) {
    this.openDeleteModal.emit(row);
  }
  delete() {
    this.onDelete.emit();
  }

  update(row: any) {
    this.onUpdate.emit(row);
  }
  view(row: any) {
    this.onView.emit(row);
  }

  add() {
    this.onAdd.emit();
  }

  onPageChange(page: number) {
    // console.log('onPageChange', page);
    // this.currentPage = page;
    // Fetch data for the new page
    this.pageChange.emit(page);
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPageChange.emit(itemsPerPage);
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
}
