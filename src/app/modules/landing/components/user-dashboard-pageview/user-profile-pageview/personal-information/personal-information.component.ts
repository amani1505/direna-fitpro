import { NgClass } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '@model/user';
import { UserService } from '@service/modules/user.service';

@Component({
    selector: 'personal-information',
    imports: [ReactiveFormsModule, NgClass],
    templateUrl: './personal-information.component.html',
    styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnChanges {
  @Input() user: Profile;
  private readonly _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  loading = this._userService.loading;

  readonly genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  userForm = this._formBuilder.group({
    first_name: ['', Validators.required],
    middle_name: [''],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone_number: ['', Validators.required],
    gender: ['', Validators.required],
  });

  /** The profile can arrive after the form is shown, so fill it whenever it changes. */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.userForm.patchValue({
        first_name: this.user.first_name ?? '',
        middle_name: this.user.middle_name ?? '',
        last_name: this.user.last_name ?? '',
        email: this.user.email ?? '',
        phone_number: this.user.phone_number ?? '',
        gender: this.user.gender ?? '',
      });
    }
  }

  invalid(control: string): boolean {
    const c = this.userForm.get(control);
    return !!c && c.invalid && c.touched;
  }

  savePersonalInfo(): void {
    if (this.userForm.invalid || !this.user?.id) {
      this.userForm.markAllAsTouched();
      return;
    }
    this._userService.update(this.user.id, this.userForm.value);
  }
}
