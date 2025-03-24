import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'personal-information',
  standalone: true,
  imports: [FormsModule, AngularSvgIconModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    bio: '',
  };

  savePersonalInfo(): void {
    console.log('Saving personal info:', this.user);
    // Implement save functionality
  }
}
