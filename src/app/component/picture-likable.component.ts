import {Component, Input, ElementRef, OnDestroy, OnInit} from "@angular/core";

import {PhotosService} from "../services/photos-service";
import {Platform, Events, Gesture} from "ionic-angular";
import {AuthService} from "../services/auth-service";
import {ENV} from "../app.module";
declare var Hammer;

@Component({
  selector: 'picture-likable',
  template:`
    <img src="{{baseUrl}}/common/picture/{{picId}}/preview?format={{format}}" width="100%"/>    
  `,
  styles: []
})

export class PictureLikableComponent implements OnInit, OnDestroy {
  @Input('id') picId: String;
  @Input('format') format: String = "PREVIEW";
  baseUrl: String = ENV.API_URL;
  el: HTMLElement;
  pressGesture: Gesture;

  constructor(private photoService: PhotosService, private platform: Platform,
              private events: Events, private authService: AuthService,
              private _el: ElementRef) {
    this.platform = platform;
    this.events = events;
    this.el = _el.nativeElement;
  }

  ngOnInit() {
    this.pressGesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Tap, {taps: 2}]
      ]
    });
    this.pressGesture.listen();
    this.pressGesture.on('tap', e => {
      this.like();
    });
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }

  like() {
    if (!this.authService.retrieveUser()) {
      return;
    }
    //if (this.platform.is('mobileweb')) {
      if (localStorage.getItem("likes") && JSON.parse(localStorage.getItem("likes")).indexOf(this.picId) > -1) {
        return;
      }
      this.photoService.like(this.picId).subscribe(
        _likes => this.likedLocalStorage(),
        error =>  console.log(error)
      );
    /*} else {
      //todo : check nativeStorage
      this.photoService.like(this.picId).subscribe();
    }*/
  }

  private likedLocalStorage() {
    let likes = localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : [];
    likes.push(this.picId);
    localStorage.setItem("likes", JSON.stringify(likes));
    this.events.publish('photo:liked', this.picId);
  }
}
