import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ENV} from "../../app/main.dev";
import {AnimalsService} from "../../app/services/animals-service";
import {Animal} from "../../app/domain/animal";
import {Photo} from "../../app/domain/photo";
import {PhotosService} from "../../app/services/photos-service";

@Component({
  selector: 'animal-details',
  templateUrl: 'animal-details.html',
  styles: [`
    .sibling {
      margin-top: 60px;
    }
    .label {
      float: left;
      margin-right: 10px;
      margin-top: 10px;
    }
  `]
})
export class AnimalDetails implements OnInit {
  animal: Animal = new Animal();
  animalUrl: String;
  siblings: Array<Animal> = [];
  pictures: Array<Photo> = [];
  page: number = 0;
  total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public animalsService: AnimalsService, private photosService : PhotosService) {

  }

  ngOnInit(): void {
    if (this.navParams.get('animalId')) {
      this.animalsService.retrieveAnimal(this.navParams.get('animalId'))
        .subscribe(
          animal => this.init(animal),
          error =>  console.log(error));
    }
  }

  private init(animal: Animal) {
      this.animal = animal;
      this.animalUrl = ENV.API_URL + "/common/animal/" + animal.id + "/preview?format=THUMB";
      this.animalsService.retrieveAnimalSiblings(animal.id)
        .subscribe(
          animals => this.siblings = animals,
          error =>  console.log(error));
      this.photosService.browseWithId(this.page, "animalId", animal.id)
        .subscribe(
          results => this.handleResults(results),
          error =>  console.log(error));
  }

  private handleResults(results: any) {
    this.pictures = results.pictures;
    this.total = results.total;
  }

  doInfinite(infiniteScroll) {
    if (this.pictures.length < this.total) {
      this.page++;
      infiniteScroll.enable(false);
      this.photosService.browseWithId(this.page, "animalId", this.animal.id)
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
