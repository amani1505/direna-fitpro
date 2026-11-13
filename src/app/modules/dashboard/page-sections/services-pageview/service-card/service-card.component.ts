import { DatePipe } from '@angular/common';
import { SpotlightDirective } from '@directive/spotlight.directive';
import {
  Component,
  inject,
  Input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalComponent } from '@components/modal/modal.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EditServiceComponent } from '../edit-service/edit-service.component';
import { Services } from '@model/services.interface';
import { ServicesService } from '@service/modules/services.service';

@Component({
  selector: 'ServiceCard',
  imports: [
    SpotlightDirective,
    AngularSvgIconModule,
    DatePipe,
    ModalComponent,
    EditServiceComponent,
  ],
  templateUrl: './service-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './service-card.component.scss',
})
export class ServiceCardComponent {
  @Input({ required: true }) service: Services;
  private _serviceService = inject(ServicesService);

  deleteContent = 'Are you sure you want to delete this Service?';
  deleteSubContent =
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
