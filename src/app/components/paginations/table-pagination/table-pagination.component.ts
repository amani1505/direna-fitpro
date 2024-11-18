import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'table-pagination',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginationComponent {
  @Input() itemsPerPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() paginatedItems = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.emitPageChange();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.emitPageChange();
  }

  emitPageChange() {
    this.pageChange.emit(this.currentPage);
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    const startIndex = page * pageSize;
    return `${startIndex} - ${length} of ${length}`;
  }
  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
