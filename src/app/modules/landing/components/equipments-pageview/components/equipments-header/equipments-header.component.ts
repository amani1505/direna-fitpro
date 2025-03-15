import { Component, EventEmitter, Output } from '@angular/core';
import { MenuPopupComponent } from '@components/menu-popup/menu-popup.component';
import { DropdownConfig, DropdownSection } from '@model/dropdown';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EquipmentsCardComponent } from '../equipments-card/equipments-card.component';

@Component({
  selector: 'equipments-header',
  standalone: true,
  imports: [AngularSvgIconModule, MenuPopupComponent],
  templateUrl: './equipments-header.component.html',
  styleUrl: './equipments-header.component.scss',
})
export class EquipmentsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<'DESC' | 'ASC'>();

  sort = 'DESC';
  sortName = 'Newest First';
  itemsShowCount = 12;
  currentColumns = 3;

  // Sort Dropdown Configuration
  sortConfig: DropdownConfig = {
    triggerType: 'button',
    width: 'w-56',
    position: 'left',
    animation: 'fade',
  };

  sortSections: DropdownSection[] = [
    {
      items: [
        {
          label: 'Newest First',
          icon: './assets/icons/heroicons/outline/bars-arrow-down.svg',
          action: () => this.onSortUpdate('DESC', 'Newest First'),
          badge:
            this.sort === 'desc' ? { text: '✓', color: 'green' } : undefined,
        },
        {
          label: 'Oldest First',
          icon: './assets/icons/heroicons/outline/bars-arrow-up.svg',
          action: () => this.onSortUpdate('ASC', 'Oldest First'),
          badge:
            this.sort === 'asc' ? { text: '✓', color: 'green' } : undefined,
        },
      ],
    },
  ];

  // Count Dropdown Configuration
  countConfig: DropdownConfig = {
    triggerType: 'button',
    width: 'w-40',
    position: 'right',
    animation: 'scale',
  };

  countSections: DropdownSection[] = [
    {
      items: [
        {
          label: '12 items',
          action: () => this.onItemUpdate(12),
          badge:
            this.itemsShowCount === 12
              ? { text: '✓', color: 'green' }
              : undefined,
        },
        {
          label: '24 items',
          action: () => this.onItemUpdate(24),
          badge:
            this.itemsShowCount === 24
              ? { text: '✓', color: 'green' }
              : undefined,
        },
        {
          label: '36 items',
          action: () => this.onItemUpdate(36),
          badge:
            this.itemsShowCount === 36
              ? { text: '✓', color: 'green' }
              : undefined,
        },
      ],
    },
  ];

  handleSortChange(item: any): void {
    if (item.action) {
      item.action();
    }
  }

  handleCountChange(item: any): void {
    if (item.action) {
      item.action();
    }
  }

  onSortUpdate(newSort: 'DESC' | 'ASC', sortName: string): void {
    this.sort = newSort;
    this.sortName = sortName;
    this.sortChange.emit(newSort);
    this.updateSortSections();
  }

  onItemUpdate(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
    this.updateCountSections();
  }

  onColumnsUpdate(colNumber: number): void {
    this.currentColumns = colNumber;
    this.columnsCountChange.emit(colNumber);
  }

  private updateSortSections(): void {
    this.sortSections = [
      {
        items: this.sortSections[0].items.map((item) => ({
          ...item,
          badge: item.label.toLowerCase().includes(this.sort)
            ? { text: '✓', color: 'green' }
            : undefined,
        })),
      },
    ];
  }

  private updateCountSections(): void {
    this.countSections = [
      {
        items: this.countSections[0].items.map((item) => ({
          ...item,
          badge: item.label.includes(this.itemsShowCount.toString())
            ? { text: '✓', color: 'green' }
            : undefined,
        })),
      },
    ];
  }
}
