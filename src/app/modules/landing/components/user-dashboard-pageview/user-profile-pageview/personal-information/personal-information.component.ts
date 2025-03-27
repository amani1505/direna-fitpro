import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Profile } from '@model/user';
import { UserService } from '@service/modules/user.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'personal-information',
  standalone: true,
  imports: [FormsModule, AngularSvgIconModule, ReactiveFormsModule, NgClass],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent implements OnInit {
  @Input() user: Profile;
  private readonly _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  loading = this._userService.loading;

  userForm: FormGroup;

  ngOnInit(): void {
    console.log(this.user);

    this.userForm = this._formBuilder.group({
      first_name: [this.user?.first_name, Validators.required],
      middle_name: [this.user?.middle_name],
      last_name: [this.user?.last_name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone_number: [this.user?.phone_number, Validators.required],
      gender: [this.user?.gender, Validators.required],
    });
  }

  savePersonalInfo(): void {
    if (this.userForm.invalid) {
      return;
    }
    this._userService.update(this.user.id, this.userForm.value);
  }
}
