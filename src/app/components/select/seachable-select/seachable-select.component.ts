import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@directive/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'SeachableSelect',
  standalone: true,
  imports: [
    CommonModule,
    ClickOutsideDirective,
    FormsModule,
    AngularSvgIconModule,
  ],
  templateUrl: './seachable-select.component.html',
  styleUrl: './seachable-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeachableSelectComponent {
  @Input({ required: true }) options: string[] = [];
  @Input({ required: true }) placeholder: string = 'Select an option';
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  selectedOption: string = '';
  dropdownOpen: boolean = false;
  searchTerm: string = '';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.searchTerm = '';
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.dropdownOpen = false;
  }
  filterOptions() {
    return this.options.filter((option) =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
  onSearchChange() {
    this.search.emit(this.searchTerm);
    this.filterOptions();
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }
}
