import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'TableFooter',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 100;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Output() pageChange = new EventEmitter<number>();

  // Start and end item numbers for current page
  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxPages = 4;

    // Show the first pages (1-4)
    for (let i = 1; i <= Math.min(maxPages, this.totalPages); i++) {
      pages.push(i);
    }

    if (this.totalPages > maxPages * 2 + 1) {
      if (this.currentPage > maxPages + 1) {
        pages.push('...');
      }

      // Add the current page in the middle (around the current page) dynamically
      let start = Math.max(this.currentPage - 1, maxPages + 1);
      let end = Math.min(this.currentPage + 1, this.totalPages - maxPages);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (this.currentPage < this.totalPages - maxPages) {
        pages.push('...');
      }
    }

    // Show the last pages (totalPages - 3 to totalPages)
    for (
      let i = Math.max(
        this.totalPages - maxPages + 1,
        (pages[pages.length - 1] as number) + 1,
      );
      i <= this.totalPages;
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }

    return pages;
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.emitPageChange();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.emitPageChange();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  emitPageChange(): void {
    this.pageChange.emit(this.currentPage);
  }
}
