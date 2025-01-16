import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ModalComponent } from '@components/modal/modal.component';
import { Branch } from '@model/branch.interface';
import { BranchesService } from '@service/modules/branches.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EditBranchComponent } from '../edit-branch/edit-branch.component';

@Component({
  selector: 'BranchCard',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    DatePipe,
    ModalComponent,
    EditBranchComponent,
    NgIf,
  ],
  templateUrl: './branch-card.component.html',
  styleUrl: './branch-card.component.scss',
})
export class BranchCardComponent {
  @Input({ required: true }) branch: Branch;
  private _branchService = inject(BranchesService);

  deleteContent: string = 'Are you sure you want to delete this Branch?';
  deleteSubContent: string =
    'Deleting this member will permanently remove this branch from your branches list';

  isDeleteModalOpen = signal<boolean>(false);
  isBranchModalOpen = signal<boolean>(false);

  branchId = signal<string>('');

  openDeleteModal() {
    this.isDeleteModalOpen.set(true);
  }

  delete() {
    this._branchService.delete(this.branch?.id);
    this.isDeleteModalOpen.set(false);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
  }
  openEditModal(id: string) {
    this.branchId.set(id);
    this.isBranchModalOpen.set(true);
  }

  closeEditModal() {
    this.isBranchModalOpen.set(false);
  }
}
