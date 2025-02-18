import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();

  private documentClickSubscription: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event: Event) => {
          const clickTarget = event.target as HTMLElement;
          return !this.elementRef.nativeElement.contains(clickTarget);
        })
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
