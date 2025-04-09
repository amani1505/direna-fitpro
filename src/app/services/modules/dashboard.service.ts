import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { DashboardData } from '@model/dashboard';
import { ToastService } from '@service/toast.service';
import { environment } from 'environments/environment';

@Injectable()
export class DashboardService {
  private _http = inject(HttpClient);
  private _toast = inject(ToastService);
  private _loading = signal<boolean>(false);
  private _dashboard = signal<DashboardData>({
    counts: [],
    latestBranches: [],
    latestServices: [],
    latestStaffs: [],
    latestMembers: [],
    latestEquipments: [],
  });

  dashboard: Signal<DashboardData> = this._dashboard.asReadonly();

  loading: Signal<boolean> = this._loading.asReadonly();

  findDashboardData(): void {
    this._loading.set(true);
    this._http.get<DashboardData>(`${environment.apiUrl}dashboard/stats`).subscribe({
      next: (res) => {
        this._dashboard.set(res);
        this._loading.set(false);
      },
      error: (err) => {
        this._toast.error(err.error.message);
        this._loading.set(false);
      },
    });
  }
}
