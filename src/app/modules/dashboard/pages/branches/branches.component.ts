import { Component } from '@angular/core';
import { BranchPageviewComponent } from '@modules/dashboard/page-sections/branch-pageview/branch-pageview.component';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [BranchPageviewComponent],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss',
})
export class BranchesComponent {}
