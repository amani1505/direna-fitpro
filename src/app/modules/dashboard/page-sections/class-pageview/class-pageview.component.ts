import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '@components/modal/modal.component';
import { GymClass } from '@model/class.interface';
import { ClassesService } from '@service/modules/classes.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'ClassPageview',
  standalone: true,
  imports: [AngularSvgIconModule, ModalComponent],
  templateUrl: './class-pageview.component.html',
  styleUrl: './class-pageview.component.scss',
})
export class ClassPageviewComponent implements OnInit {
  private _classesService = inject(ClassesService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  deleteContent = 'Are you sure you want to delete this Class?';
  deleteSubContent =
    'Deleting this member will permanently remove this class from your gym classes list';

  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  classes = computed(() => this._classesService.allClasses() || []);
  isDeleteModalOpen = signal<boolean>(false);

  classId = signal<string>('');

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

  addNew() {
    this._router.navigate(['add'], { relativeTo: this._route });
  }
  updateClass(id: string) {
    this._router.navigate(['edit', id], { relativeTo: this._route });
  }

  openDeleteModal(id: string) {
    this.classId.set(id);
    this.isDeleteModalOpen.set(true);
  }

  delete() {
    this._classesService.delete(this.classId());
    this.isDeleteModalOpen.set(false);
  }
  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
  }
}
