import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountData } from '@model/dashboard';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SpotlightDirective } from '@directive/spotlight.directive';

@Component({
    selector: 'header-cards',
    imports: [AngularSvgIconModule, NgClass, RouterModule, SpotlightDirective],
    templateUrl: './header-cards.component.html',
    styleUrl: './header-cards.component.scss'
})
export class HeaderCardsComponent {
  @Input() dashboardStats: CountData[] = [];

  private readonly accents: Record<string, { border: string; chip: string; text: string }> = {
    Branches: { border: 'hover:border-blue-500/60', chip: 'bg-blue-500/10 text-blue-500', text: 'text-blue-500' },
    Services: { border: 'hover:border-rose-500/60', chip: 'bg-rose-500/10 text-rose-500', text: 'text-rose-500' },
    Members: { border: 'hover:border-emerald-500/60', chip: 'bg-emerald-500/10 text-emerald-500', text: 'text-emerald-500' },
    Staffs: { border: 'hover:border-primary-500/60', chip: 'bg-primary-500/10 text-primary-500', text: 'text-primary-500' },
    Equipments: { border: 'hover:border-violet-500/60', chip: 'bg-violet-500/10 text-violet-500', text: 'text-violet-500' },
  };

  private readonly fallback = {
    border: 'hover:border-primary-500/60',
    chip: 'bg-primary-500/10 text-primary-500',
    text: 'text-primary-500',
  };

  accent(title: string) {
    return this.accents[title] ?? this.fallback;
  }
}
