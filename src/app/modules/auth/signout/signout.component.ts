import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { ToastService } from '@service/toast.service';

@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss',
})
export class SignoutComponent {
  private readonly _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);

  goBack() {
    const redirectURL =
      this._activatedRoute.snapshot.queryParamMap.get('redirectURL');
    this._router.navigateByUrl(redirectURL);
  }
  signOut() {
    this._authService.signOut().subscribe({
      next: () => {
        this._router.navigateByUrl('/');
        this._toastService.success("you've successfully signed out");
      },
      error: (error) => {
        this._toastService.error(
          `An error occurred while signing out: ${error.error.message}`,
        );
      },
    });
  }
}
