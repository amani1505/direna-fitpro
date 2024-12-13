import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ClickOutsideDirective } from '@directive/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'NormalSelect',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, AngularSvgIconModule],
  templateUrl: './normal-select.component.html',
  styleUrl: './normal-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NormalSelectComponent {
  @Input({ required: true }) options: Array<{ label: string; value: string }> = [];
  @Input({ required: true }) placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<any>();

  selectedOption: string = '';
  dropdownOpen: boolean = false;

  ngOnChanges() {
    // Update the selected option if it is provided as an input
    if (this.options.some((option) => option.value === this.selectedOption)) {
      this.selectedOption = this.options.find((option) => option.value === this.selectedOption)?.value || '';
    } else {
      this.selectedOption = this.options[0]?.value || '';
    }
  }

  ngOnInit() {
    // Ensure the selected option is set correctly based on the input value
    this.selectedOption = this.options.find((option) => option.value === this.selectedOption)?.value || this.options[0]?.value || '';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.dropdownOpen = false;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  getSelectedLabel(): string {
    const selectedOption = this.options.find((option) => option.value === this.selectedOption);
    return selectedOption ? selectedOption.label : this.placeholder;
  }
}
