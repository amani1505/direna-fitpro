import { Location, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
  private _activatedRoute = inject(ActivatedRoute);
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
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/signed-in-redirect';
        if (response.role.name === 'Super Admin') {
          this._router.navigateByUrl(redirectURL);
        } else {
          this._router.navigateByUrl(redirectURL);
        }
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this._toast.error(
          `An error occurred while Login: ${error.error.message}`,
        );
      },
    });
  }
}
