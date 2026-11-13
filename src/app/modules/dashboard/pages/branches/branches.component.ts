import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BranchPageviewComponent } from '@modules/dashboard/page-sections/branch-pageview/branch-pageview.component';

@Component({
  selector: 'app-branches',
  imports: [BranchPageviewComponent],
  templateUrl: './branches.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './branches.component.scss',
})
export class BranchesComponent {}
