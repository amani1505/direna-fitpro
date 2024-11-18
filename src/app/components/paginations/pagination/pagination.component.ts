import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'Pagination',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input({ required: true }) totalPages: number = 1;
  @Input({ required: true }) currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 2;
    const startPages =3 ;
    const endPages = 3;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);

      pages.push(1);

      if (start > startPages + 1) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < this.totalPages - endPages) {
        pages.push('...');
      }

      pages.push(this.totalPages);
    }

    return pages;
  }

  selectPage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
