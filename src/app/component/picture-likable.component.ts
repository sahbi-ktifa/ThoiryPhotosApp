import {Component, Input} from "@angular/core";
import {ENV} from "../main.dev";
import {PhotosService} from "../services/photos-service";
import {Platform, Events} from "ionic-angular";
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'picture-likable',
  template:`
    <img src="{{baseUrl}}/common/picture/{{picId}}/preview?format={{format}}" width="100%" (click)="like()"/>    
  `,
  styles: []
})

export class PictureLikableComponent {
  @Input('id') picId: String;
  @Input('format') format: String = "PREVIEW";
  baseUrl: String = ENV.API_URL;

  constructor(private photoService: PhotosService, private platform: Platform, private events: Events, private authService: AuthService) {
    this.platform = platform;
    this.events = events;
  }

  like() {
    if (!this.authService.retrieveUser()) {
      return;
    }
    if (this.platform.is('mobileweb')) {
      if (localStorage.getItem("likes") && JSON.parse(localStorage.getItem("likes")).indexOf(this.picId) > -1) {
        return;
      }
      this.photoService.like(this.picId).subscribe(
        _likes => this.likedLocalStorage(),
        error =>  console.log(error)
      );
    } else {
      //todo : check nativeStorage
      this.photoService.like(this.picId).subscribe();
    }
  }

  private likedLocalStorage() {
    let likes = localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : [];
    likes.push(this.picId);
    localStorage.setItem("likes", JSON.stringify(likes));
    this.events.publish('photo:liked', this.picId);
  }
}
