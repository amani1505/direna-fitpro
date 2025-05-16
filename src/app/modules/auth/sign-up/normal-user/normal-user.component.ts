import { NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'user-registaration',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgIf,
    NgClass,
  ],
  templateUrl: './normal-user.component.html',
  styleUrl: './normal-user.component.scss',
})
export class NormalUserComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  submitted = false;
  loading = false;

  passwordTextType!: boolean;

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  authForm = this._formBuilder.group({
    first_name: ['', Validators.required],
    middle_name: [''],
    last_name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],

    gender: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.authForm);
    this.submitted = true;

    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    }

    this._router.navigate(['/']);
  }
}
