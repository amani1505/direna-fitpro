import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ModalComponent } from '@components/modal/modal.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EditServiceComponent } from '../edit-service/edit-service.component';
import { Services } from '@model/services.interface';
import { ServicesService } from '@service/modules/services.service';

@Component({
  selector: 'ServiceCard',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    DatePipe,
    ModalComponent,
    NgIf,
    EditServiceComponent,
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
})
export class ServiceCardComponent {
 @Input({ required: true }) service: Services;
  private _serviceService = inject(ServicesService);

  deleteContent: string = 'Are you sure you want to delete this Service?';
  deleteSubContent: string =
    'Deleting this member will permanently remove this service from your services list';

  isDeleteModalOpen = signal<boolean>(false);
  isServiceModalOpen = signal<boolean>(false);

  serviceId = signal<string>('');

  openDeleteModal() {
    this.isDeleteModalOpen.set(true);
  }

  delete() {
    this._serviceService.delete(this.service?.id);
    this.isDeleteModalOpen.set(false);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
  }
  openEditModal(id: string) {
    this.serviceId.set(id);
    this.isServiceModalOpen.set(true);
  }

  closeEditModal() {
    this.isServiceModalOpen.set(false);
  }



}
