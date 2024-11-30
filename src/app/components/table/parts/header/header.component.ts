import { Component, EventEmitter, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[app-table-header]',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() onCheck = new EventEmitter<boolean>();

  public toggle(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.onCheck.emit(value);
  }

}
