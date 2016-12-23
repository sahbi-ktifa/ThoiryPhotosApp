import {Component, Input} from "@angular/core";
import {ENV} from "../main.dev";
import {PhotosService} from "../services/photos-service";

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

  constructor(private photoService: PhotosService) {
  }

  like() {
    /*if (this.storage.getItem("likes") && JSON.parse(this.storage.getItem("likes")).indexOf(this.picId) > -1) {
      return;
    }
    let likes = this.storage.getItem("likes") ? JSON.parse(this.storage.getItem("likes")).push(this.picId) : [this.picId];
    this.storage.setItem("likes", JSON.stringify(likes))*/
    this.photoService.like(this.picId).subscribe();
  }
}
