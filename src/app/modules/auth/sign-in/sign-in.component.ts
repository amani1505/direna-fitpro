import { Location, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { MenuService } from '@service/menu.service';
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
    RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private _authService = inject(AuthService);
  private _menuService = inject(MenuService);
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

        // Refresh menu to reflect new role
        this._menuService.refreshMenu();

        // Default redirect to /dashboard; RoleGuard will handle further redirection
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/dashboard';
        this._router.navigateByUrl(redirectURL);
        this._toast.success(`Welcome, ${response.user.role.name}!`);
      },
      error: (error) => {
        this.loading = false;
        this._toast.error(` ${error.error.message}`);
      },
    });
  }
}
