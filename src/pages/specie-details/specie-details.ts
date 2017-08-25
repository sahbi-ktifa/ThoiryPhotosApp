import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {Specie} from "../../app/domain/specie";
import {SpeciesService} from "../../app/services/species-service";

import {Animal} from "../../app/domain/animal";
import {Photo} from "../../app/domain/photo";
import {PhotosService} from "../../app/services/photos-service";
import {ENV} from "../../app/app.module";

@Component({
  selector: 'specie-details',
  templateUrl: 'specie-details.html'
})
export class SpecieDetails implements OnInit{
  specie: Specie = new Specie();
  specieUrl: String;
  animals: Array<Animal> = [];
  pictures: Array<Photo> = [];
  page: number = 0;
  total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public speciesService: SpeciesService, private photosService : PhotosService,
              public platform: Platform) {

  }

  ngOnInit(): void {
    if (this.navParams.get('specieId')) {
      this.speciesService.retrieveSpecie(this.navParams.get('specieId'))
        .subscribe(
          specie => this.init(specie),
          error =>  console.log(error));
    }
  }

  private init(specie: Specie) {
      this.specie = specie;
      this.specieUrl = ENV.API_URL + "/common/specie/" + specie.id + "/preview?format=THUMB";
      this.speciesService.retrieveSpecieAnimals(specie.id)
        .subscribe(
          animals => this.animals = animals,
          error =>  console.log(error));
    this.photosService.browseWithId(this.page, "specieId", specie.id)
      .subscribe(
        results => this.handleResults(results),
        error =>  console.log(error));
  }

  launch(url) {
    this.platform.ready().then(() => {
      open(url, "_blank", "location=no");
    });
  }

  private handleResults(results: any) {
    this.pictures = results.pictures;
    this.total = results.total;
  }

  doInfinite(infiniteScroll) {
    if (this.pictures.length < this.total) {
      this.page++;
      infiniteScroll.enable(false);
      this.photosService.browseWithId(this.page, "specieId", this.specie.id)
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
