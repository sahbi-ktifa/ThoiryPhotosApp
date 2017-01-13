import {Component, Input, OnInit} from "@angular/core";
import {Platform, Events} from "ionic-angular";

@Component({
  selector: 'picture-liked',
  template:`
    {{liked}} <ion-icon name="heart" color="{{color}}"></ion-icon>    
  `,
  styles: []
})

export class PictureLikedComponent implements OnInit {
  @Input('id') picId: String;
  @Input('liked') liked: number;
  color: String = '';

  constructor(private platform: Platform, private events: Events) {
    this.platform = platform;
    this.events = events;
  }

  ngOnInit(): void {
    //if (this.platform.is('mobileweb')) {
      if (localStorage.getItem("likes") && JSON.parse(localStorage.getItem("likes")).indexOf(this.picId) > -1) {
        this.color = 'danger';
      }
    /*} else {
      //todo : check nativeStorage
    }*/

    this.events.subscribe('photo:liked', (picId) => {
      if (picId == this.picId) {
        this.color = 'danger';
        this.liked++;
      }
    });
  }

}
