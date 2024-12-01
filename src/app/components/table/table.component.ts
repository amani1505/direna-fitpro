import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  inject,
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
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) totalTitle!: string;
  @Input({ required: true }) totalValue!: number;
  @Input({ required: true }) buttonLabel!: string;
  @Input({ required: true }) actions: Array<TableActions> = [];
  @Input({ required: true }) data: Array<any> = [];
  @Input({ required: true }) headerColumns: Array<HeaderColumn> = [];
  @Input({ required: true }) rowColumns: Array<RowColumn> = [];
  @Input({ required: true }) itemsPerPage: number = 10;
  @Input({ required: true }) totalItems: number = 100;
  @Input({ required: true }) currentPage: number = 1;
  @Input({ required: true }) totalPages: number = 10;

  // Outputs
  @Output() onAdd = new EventEmitter<void>();
  @Output() onCheckAll = new EventEmitter<boolean>();
  @Output() onCheck = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onView = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  selectedAll: boolean = false;

  ngOnInit() {}

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

  delete(row: any) {
    this.onDelete.emit(row);
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
}
