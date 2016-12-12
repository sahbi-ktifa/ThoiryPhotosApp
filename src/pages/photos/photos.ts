import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {PhotosService} from "../../app/services/photos-service";
import {Photo} from "../../app/domain/photo";

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class Photos {

  pictures: Array<Photo> = [];
  page: number = 1;

  constructor(public navCtrl: NavController, private photosService: PhotosService) {
    this.photosService.browse(this.page)
      .subscribe(
        pictures => this.pictures = pictures,
        error =>  console.log(error));
  }

}
