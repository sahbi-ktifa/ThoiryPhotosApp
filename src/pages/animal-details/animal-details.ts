import {Component} from "@angular/core";
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
export class AnimalDetails {
  animal: Animal = new Animal();
  animalUrl: String;
  siblings: Array<Animal> = [];
  pictures: Array<Photo> = [];
  page: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public animalsService: AnimalsService, private photosService : PhotosService) {
    if (navParams.get('animalId')) {
      this.animalsService.retrieveAnimal(navParams.get('animalId'))
        .subscribe(
          animal => this.init(animal),
          error =>  console.log(error));
      this.animalsService.retrieveAnimalSiblings(navParams.get('animalId'))
        .subscribe(
          animals => this.siblings = animals,
          error =>  console.log(error));
      /*this.photosService.browse(this.page, navParams.get('animalId'))
        .subscribe(
          results => this.handleResults(results),
          error =>  console.log(error));*/
    }
  }

  private init(animal: Animal) {
      this.animal = animal;
      this.animalUrl = ENV.API_URL + "/common/animal/" + animal.id + "/preview?format=THUMB";
  }

}
