import { Location, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private _toast = inject(ToastService);
  private _location = inject(Location);

  passwordTextType!: boolean;
  loading = false;

  authForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this._toast.error('Please fill in all required fields');

      return;
    }
    this.loading = true;
    const { email, password } = this.authForm.value;

    this._authService.signIn({ username: email, password }).subscribe({
      next: (response) => {
        this.loading = false;
        this.authForm.reset();
        console.log(response);
        if (response.role.name === 'Super Admin') {
          this._router.navigate(['/admin']);
        } else {
          this._location.back()
        }
      },
      error: (error) => {
        this.loading = false;
        this.authForm.reset();
        this._toast.error(
          `An error occurred while Login: ${error.error.message}`,
        );
      },
    });
  }
}
