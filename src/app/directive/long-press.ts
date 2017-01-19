import {Directive, OnInit, OnDestroy, ElementRef} from "@angular/core";
import {Gesture} from "ionic-angular";
declare var Hammer;

@Directive({
  selector: '[longPress]'
})
export class PressDirective implements OnInit, OnDestroy {
  el: HTMLElement;
  pressGesture: Gesture;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.pressGesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Tap, {taps: 2}]
      ]
    });
    this.pressGesture.listen();
    this.pressGesture.on('tap', e => {
      console.log('pressed!!');
    });
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }
}
