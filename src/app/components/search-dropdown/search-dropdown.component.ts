import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@directive/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'environments/environment';

@Component({
  selector: 'SearchDropdown',
  standalone: true,
  imports: [AngularSvgIconModule, DatePipe, ClickOutsideDirective, FormsModule],
  templateUrl: './search-dropdown.component.html',
  styleUrl: './search-dropdown.component.scss',
})
export class SearchDropdownComponent {
  @Input() data: any[] = [];
  // @Input() hasError = signal<boolean>(false);
  @Input() isLoading = false;
  searchQuery: string = '';
  @Output() searchChange = new EventEmitter<string>();
  fileUrl = environment.staicUrl;

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.searchChange.emit(this.searchQuery);
  }

  closeDropdown(): void {
    this.searchQuery = ''; // Clear the search query to close the dropdown
    this.searchChange.emit(this.searchQuery); // Emit the empty search query
  }
}
