import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {PhotosService} from "../../app/services/photos-service";
import {Photo} from "../../app/domain/photo";
import {ENV} from "../../app/main.dev";

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class Photos {

  pictures: Array<Photo> = [];
  page: number = 0;
  baseUrl: String = ENV.API_URL;

  constructor(public navCtrl: NavController, private photosService: PhotosService) {
    this.photosService.browse(this.page)
      .subscribe(
        pictures => this.pictures = pictures,
        error =>  console.log(error));
  }

}
