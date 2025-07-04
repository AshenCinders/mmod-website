import {
  ComponentRef,
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  HostBinding,
  Input,
  createComponent,
  ApplicationRef,
  inject
} from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

/*
 * Shows an m-spinner component when the directive input value is `true`.
 * Note: this will override the `position` property of the element it's applied
 * to to `relative`.
 *
 * Based off of Nebular directive
 * https://github.com/akveo/nebular/blob/master/src/framework/theme/components/spinner/spinner.directive.ts
 */
@Directive({ selector: '[mSpinner]', standalone: true })
export class SpinnerDirective implements OnInit {
  private appRef = inject(ApplicationRef);
  private renderer = inject(Renderer2);
  private directiveElement = inject(ElementRef);

  spinner: ComponentRef<SpinnerComponent>;

  @Input()
  set mSpinner(val: boolean) {
    if (val) {
      this.show();
    } else {
      this.hide();
    }
  }

  @HostBinding('class.spinner-container--active')
  protected active = false;

  ngOnInit() {
    this.spinner = createComponent(SpinnerComponent, {
      environmentInjector: this.appRef.injector
    });
    this.spinner.changeDetectorRef.detectChanges();
    (this.directiveElement.nativeElement as HTMLElement).style.position =
      'relative';
    this.renderer.appendChild(
      this.directiveElement.nativeElement,
      this.spinner.location.nativeElement
    );
    this.renderer.addClass(
      this.directiveElement.nativeElement,
      'spinner-container'
    );
  }

  hide() {
    this.active = false;
  }

  show() {
    this.active = true;
  }
}
