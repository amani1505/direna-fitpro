import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GymClass } from '@model/class.interface';
import { ClassesServices } from '@service/modules/classes.service';

@Component({
  selector: 'ClassPageview',
  standalone: true,
  imports: [],
  templateUrl: './class-pageview.component.html',
  styleUrl: './class-pageview.component.scss',
})
export class ClassPageviewComponent implements OnInit {
  private _classesService = inject(ClassesServices);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  // isBranchModalOpen = signal<boolean>(false);

  // searchBy = signal<string>('road');

  classes = computed(() => this._classesService.allClasses() || []);

  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  ngOnInit(): void {
    this._classesService.getAllClasses();
  }

  getClassesForDay(day: string): GymClass[] {
    return this.classes().filter((cls) => cls.day === day);
  }

  lightenColor(color: string, percent: number): string {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, Math.floor((num >> 16) + 255 * percent));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + 255 * percent));
    const b = Math.min(255, Math.floor((num & 0x0000ff) + 255 * percent));
    return `rgb(${r}, ${g}, ${b})`;
  }
}
