import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _toast: HotToastService) {}

  error(message: string) {
    this._toast.error(message, {
      position: 'top-right',
      dismissible: true,
      autoClose: false,
      style: {
        borderLeft: '4px solid #fb7185',
        padding: '10px',
        color: '#e11d48',
        backgroundColor: '#ffe4e6',
        fontWeight: 400,
        fontSize: '12px',
        zIndex: 2147483647,
      },
    });
  }

  success(message: string) {
    this._toast.success(message, {
      position: 'top-right',
      autoClose: true,
      style: {
        borderLeft: '4px solid #4ade80',
        padding: '10px',
        color: '#16a34a',
        backgroundColor: '#dcfce7',
        fontWeight: 400,
        fontSize: '12px',
        zIndex: 2147483647,
      },
    });
  }

  warning(message: string) {
    this._toast.success(message, {
      position: 'top-right',
      dismissible: true,
      autoClose: true,
      style: {
        borderLeft: '4px solid #facc15',
        padding: '10px',
        color: '#ca8a04',
        backgroundColor: '#fef9c3',
        fontWeight: 400,
        fontSize: '12px',
        zIndex: 2147483647,
      },
    });
  }

  info(message: string) {
    this._toast.info(message, {
      position: 'top-right',
      autoClose: false,
      style: {
        borderLeft: '4px solid #3b82f6', // Blue border
        padding: '10px',
        color: '#1e40af', // Dark blue text
        backgroundColor: '#dbeafe', // Light blue background
        fontWeight: 400,
        fontSize: '12px',
        zIndex: 2147483647,
      },
    });
  }
}
