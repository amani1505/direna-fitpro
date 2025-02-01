import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
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
  @Input({ required: true }) options: Array<{ label: string; value: string }> =
    [];
  @Input({ required: true }) placeholder: string = 'Select an option';
  @Input() width = 'w-full';
  @Output() selectionChange = new EventEmitter<any>();

  @Input() selectedOption = signal<string>('');
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption.set(option);
    this.selectionChange.emit(option);
    this.dropdownOpen = false;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  getSelectedLabel(): string {
    const selectedOption = this.options.find(
      (option) => option.value === this.selectedOption(),
    );
    return selectedOption ? selectedOption.label : this.placeholder;
  }
}
