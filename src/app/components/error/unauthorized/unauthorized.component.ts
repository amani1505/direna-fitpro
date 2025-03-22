import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'unauthorized',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  private _location = inject(Location);

  goBack() {
    this._location.back();
  }
}
