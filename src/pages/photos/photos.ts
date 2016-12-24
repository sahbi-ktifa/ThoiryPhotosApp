import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {PhotosService} from "../../app/services/photos-service";
import {Photo} from "../../app/domain/photo";

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class Photos implements OnInit {
  title: String = "Fil d'actualités";
  pictures: Array<Photo> = [];
  page: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this.photosService.browse(this.page)
      .subscribe(
        results => this.handleResults(results),
        error =>  console.log(error));
  }

  constructor(public navCtrl: NavController, private photosService: PhotosService) {
  }

  private handleResults(results: any) {
    this.pictures = results.pictures;
    this.total = results.total;
  }

  doInfinite(infiniteScroll) {
    if (this.pictures.length < this.total) {
      this.page++;
      infiniteScroll.enable(false);
      this.photosService.browse(this.page)
        .subscribe(
          results => this.handleAsync(results, infiniteScroll),
          error =>  console.log(error));
    } else {
      infiniteScroll.enable(false);
    }
  }

  private handleAsync(results: any, infiniteScroll) {
    this.pictures = this.pictures.concat(results.pictures);
    if (this.pictures.length < this.total) {
      infiniteScroll.enable(true);
    }
    infiniteScroll.complete();
  }

}
