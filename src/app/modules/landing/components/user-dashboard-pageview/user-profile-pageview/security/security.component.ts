import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '@service/auth.service';
import { ToastService } from '@service/toast.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'personal-security',
  imports: [AngularSvgIconModule, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './security.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './security.component.scss',
})
export class SecurityComponent {
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);
  loading = this._authService.updatePasswordLoading;
  passwordForm: FormGroup;

  // Signals for password criteria and strength
  passwordStrengthText = signal<string>('Weak');
  criteriaFulfilled = signal<{
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
  }>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  isNewPasswordVisible = signal<boolean>(false);
  isConfirmPasswordVisible = signal<boolean>(false);
  isCurrentPasswordVisible = signal<boolean>(false);

  readonly rules: {
    key: 'length' | 'uppercase' | 'lowercase' | 'number' | 'specialChar';
    label: string;
  }[] = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'uppercase', label: 'An uppercase letter' },
    { key: 'lowercase', label: 'A lowercase letter' },
    { key: 'number', label: 'A number' },
    { key: 'specialChar', label: 'A symbol: @ $ ! % * ? &' },
  ];

  /** How many of the rules the new password meets. */
  metCount = computed(
    () => Object.values(this.criteriaFulfilled()).filter(Boolean).length,
  );

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordComplexityValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );

    // Effect to check password strength on every new password input
    effect(
      () => {
        this.updatePasswordStrength();
      },
      { allowSignalWrites: true },
    );
  }

  // Toggle password visibility
  toggleNewPasswordVisibility() {
    this.isNewPasswordVisible.set(!this.isNewPasswordVisible());
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible.set(!this.isConfirmPasswordVisible());
  }

  toggleCurrentPasswordVisibility() {
    this.isCurrentPasswordVisible.set(!this.isCurrentPasswordVisible());
  }

  // Custom validator for password complexity
  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const lengthValid = value && value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&]/.test(value);

      const passwordValid =
        lengthValid &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar;

      return passwordValid ? null : { complexity: true };
    };
  }

  // Validator to ensure passwords match
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    return newPassword &&
      confirmPassword &&
      newPassword.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  // Update password strength and criteria
  updatePasswordStrength() {
    const password = this.passwordForm.get('newPassword')?.value || '';

    // Check each criteria
    const lengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    // Update criteria signal
    this.criteriaFulfilled.set({
      length: lengthValid,
      uppercase: hasUpperCase,
      lowercase: hasLowerCase,
      number: hasNumber,
      specialChar: hasSpecialChar,
    });

    // Determine overall strength
    const criteriaCount = [
      lengthValid,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    ].filter(Boolean).length;

    // Always set a strength text
    switch (criteriaCount) {
      case 0:
      case 1:
      case 2:
        this.passwordStrengthText.set('Weak');
        break;
      case 3:
      case 4:
        this.passwordStrengthText.set('Moderate');
        break;
      case 5:
        this.passwordStrengthText.set('Strong');
        break;
    }
  }

  strengthBarClass(): string {
    switch (this.passwordStrengthText()) {
      case 'Strong':
        return 'bg-emerald-500';
      case 'Moderate':
        return 'bg-amber-500';
      default:
        return 'bg-rose-500';
    }
  }

  strengthTextClass(): string {
    switch (this.passwordStrengthText()) {
      case 'Strong':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'Moderate':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-rose-600 dark:text-rose-400';
    }
  }

  invalid(control: string): boolean {
    const c = this.passwordForm.get(control);
    return !!c && c.invalid && c.touched;
  }

  mismatch(): boolean {
    const confirm = this.passwordForm.get('confirmPassword');
    return (
      !!confirm?.value &&
      !!confirm?.touched &&
      this.passwordForm.hasError('passwordMismatch')
    );
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value;

    this._authService
      .updatePassword({
        password: currentPassword,
        newPassword,
      })
      .subscribe({
        next: () => {
          this.passwordForm.reset();
          this.updatePasswordStrength();
        },
        error: (error) => {
          this._toastService.error(
            error?.error?.message || "Couldn't update the password. Try again.",
          );
        },
      });
  }
}
