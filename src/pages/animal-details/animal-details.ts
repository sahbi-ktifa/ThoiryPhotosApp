import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ENV} from "../../app/main.dev";
import {AnimalsService} from "../../app/services/animals-service";
import {Animal} from "../../app/domain/animal";

@Component({
  selector: 'animal-details',
  templateUrl: 'animal-details.html'
})
export class AnimalDetails {
  animal: Animal = new Animal();
  animalUrl: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public animalsService: AnimalsService) {
    if (navParams.get('animalId')) {
      this.animalsService.retrieveAnimal(navParams.get('animalId'))
        .subscribe(
          animal => this.init(animal),
          error =>  console.log(error));
    }
  }

  private init(animal: Animal) {
      this.animal = animal;
      this.animalUrl = ENV.API_URL + "/common/animal/" + animal.id + "/preview?format=THUMB";
  }

}
