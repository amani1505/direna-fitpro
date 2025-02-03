import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@directive/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';

export interface MultiSelectOption {
  label: string;
  value: string;
}

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
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent {
  // Signals for reactive state management
  private optionsSignal = signal<MultiSelectOption[]>([]);
  @Input() selectedValuesSignal = signal<string[]>([]);
  private searchTermSignal = signal('');

  // Signals for UI state
  dropdownOpenSignal = signal(false);
  isTouchedSignal = signal(false); // Tracks if the field is touched

  // Validation Signal
  isValid = computed(() => this.selectedValuesSignal().length > 0);

  // Computed signals
  filteredOptions = computed(() => {
    const options = this.optionsSignal();
    const searchTerm = this.searchTermSignal().toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm),
    );
  });

  selectedOptionDetails = computed(() =>
    this.selectedValuesSignal().map(
      (selectedValue) =>
        this.optionsSignal().find((opt) => opt.value === selectedValue)!,
    ),
  );

  @Input({ required: true })
  set options(value: MultiSelectOption[]) {
    this.optionsSignal.set(value);
  }
  get options(): MultiSelectOption[] {
    return this.optionsSignal();
  }

  @Input({ required: true }) placeholder = 'Select an option';
  @Input() buttonLabel!: string;
  @Input() canAdd: boolean = false;
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() validationChange = new EventEmitter<boolean>(); // Emit validation status
  @Output() search = new EventEmitter();
  @Output() onAdd = new EventEmitter();

  ngOnChanges() {
    this.validationChange.emit(this.isValid());
  }

  toggleDropdown() {
    this.isTouchedSignal.set(true); // Mark field as touched on interaction
    this.dropdownOpenSignal.update((open) => !open);
    this.searchTermSignal.set('');
  }

  closeDropdown() {
    this.dropdownOpenSignal.set(false);
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
    this.searchTermSignal.set(searchTerm);
    this.search.emit(searchTerm);
  }

  selectOption(option: MultiSelectOption) {
    const currentSelected = this.selectedValuesSignal();
    if (!currentSelected.includes(option.value)) {
      const newSelected = [...currentSelected, option.value];
      this.selectedValuesSignal.set(newSelected);
      this.selectionChange.emit(newSelected);
      this.validationChange.emit(this.isValid());
    }
  }

  removeOption(optionValue: string, event: Event) {
    event.stopPropagation();
    const currentSelected = this.selectedValuesSignal();
    const newSelected = currentSelected.filter(
      (selected) => selected !== optionValue,
    );
    this.selectedValuesSignal.set(newSelected);
    this.selectionChange.emit(newSelected);
    this.validationChange.emit(this.isValid());
  }

  add() {
    this.onAdd.emit();
  }
}
