import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Profile } from '@model/user';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);
  private _loading = signal<boolean>(false);

  loading: Signal<boolean> = this._loading.asReadonly();

  update(id: string, data: any) {
    this._loading.set(true);

    this._http
      .patch<Profile>(`${environment.apiUrl}user/${id}`, data)
      .subscribe({
        next: (response) => {
          this._toast.success('Your Information Updated Successfully.');
          this._loading.set(false);
        },
        error: (error) => {
          this._toast.error(error.error.message);
          this._loading.set(false);
        },
      });
  }


}
