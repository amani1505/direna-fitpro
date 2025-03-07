import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '@service/modules/member.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'view-member-pageview',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, DatePipe],
  templateUrl: './view-member-pageview.component.html',
  styleUrl: './view-member-pageview.component.scss',
})
export class ViewMemberPageviewComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _memberService = inject(MemberService);
  member = computed(() => this._memberService.member());

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this._memberService.findOne(id, ['branch', 'services']);
  }
}
