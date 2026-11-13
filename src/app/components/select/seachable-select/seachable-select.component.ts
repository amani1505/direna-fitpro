import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal, OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@directive/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
export interface SearchableSelectOption {
  label: string;
  value: string;
}

@Component({
    selector: 'SeachableSelect',
    imports: [
        CommonModule,
        ClickOutsideDirective,
        FormsModule,
        AngularSvgIconModule,
    ],
    templateUrl: './seachable-select.component.html',
    styleUrl: './seachable-select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeachableSelectComponent implements OnChanges {
  private optionsSignal = signal<SearchableSelectOption[]>([]);

  // selectedValueSignal = input.required<string | null>();

  @Input() selectedValueSignal = signal<string>("");

  private searchTermSignal = signal('');
  dropdownOpenSignal = signal(false);
  isTouchedSignal = signal(false); // Tracks if the field is touched

  // Validation signal
  isValid = computed(() => !!this.selectedValueSignal());

  // Computed signals for filtered options and selected option details
  filteredOptions = computed(() => {
    const options = this.optionsSignal();
    const searchTerm = this.searchTermSignal().toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm),
    );
  });

  selectedOptionDetail = computed(() =>
    this.optionsSignal().find(
      (option) => option.value === this.selectedValueSignal(),
    ),
  );

  @Input({ required: true })
  set options(value: SearchableSelectOption[]) {
    this.optionsSignal.set(value);
  }
  get options(): SearchableSelectOption[] {
    return this.optionsSignal();
  }

  @Input({ required: true }) placeholder = 'Select an option';

  /** id of the visible heading that names this field (sets aria-labelledby). */

  @Input() labelledBy?: string;
  @Input() buttonLabel!: string;
  @Input() canAdd = false;
  @Output() selectionChange = new EventEmitter<string>();
  @Output() validationChange = new EventEmitter<boolean>();
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() onAdd = new EventEmitter();

  ngOnChanges() {
    this.validationChange.emit(this.isValid());
  }

  toggleDropdown() {
    this.isTouchedSignal.set(true); // Mark as touched on interaction
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
    this.searchTermChange.emit(searchTerm);
  }

  selectOption(option: SearchableSelectOption) {
    this.selectedValueSignal.set(option.value);
    this.selectionChange.emit(option.value);
    this.validationChange.emit(this.isValid());
    this.dropdownOpenSignal.set(false);
  }

  add() {
    this.onAdd.emit();
  }
}
