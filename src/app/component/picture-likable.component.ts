import {Component, Input, ElementRef, OnDestroy, OnInit} from "@angular/core";

import {PhotosService} from "../services/photos-service";
import {Platform, Events, Gesture} from "ionic-angular";
import {AuthService} from "../services/auth-service";
import {ENV} from "../app.module";
declare var Hammer;

@Component({
  selector: 'picture-likable',
  template:`
    <img *ngIf="!loaded" src="../../assets/loading-img.png"/>
    <img [hidden]="!loaded" (load)="finishLoad()" [src]="url" width="100%"/>      
  `,
  styles: []
})

export class PictureLikableComponent implements OnInit, OnDestroy {
  @Input('id') picId: String;
  @Input('format') format: String = "PREVIEW";
  baseUrl: String = ENV.API_URL;
  url: String;
  loaded: boolean = false;
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
    this.url = this.baseUrl + '/common/picture/' + this.picId + '/preview?format=' + this.format;
    this.pressGesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Tap, {taps: 2}]
      ]
    });
    this.pressGesture.listen();
    this.pressGesture.on('tap', e => {
      if (this.loaded) {
        this.like();
      }
    });
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }

  finishLoad() {
    console.log('load ! ');
    this.loaded = true;
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
