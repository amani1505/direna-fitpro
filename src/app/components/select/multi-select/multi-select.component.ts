import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@directive/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'MultiSelect',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideDirective,
    AngularSvgIconModule,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent {
  @Input({ required: true }) options: string[] = [];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Input({ required: true }) placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<Array<string>>();

  selectedOptions: string[] = [];
  filteredOptions: string[] = [];
  dropdownOpen: boolean = false;
  searchTerm: string = '';

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.searchTerm = '';
    this.filterOptions();
  }

  filterOptions() {
    const lowerSearch = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(lowerSearch),
    );
  }

  onSearchChange() {
    this.search.emit(this.searchTerm);
    this.filterOptions();
  }

  selectOption(option: string) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
      this.selectionChange.emit(this.selectedOptions);
    }
    this.filterOptions();
  }

  removeOption(option: string, event: Event) {
    event.stopPropagation();
    this.selectedOptions = this.selectedOptions.filter(
      (selected) => selected !== option,
    );
    this.filterOptions();
  }
}
