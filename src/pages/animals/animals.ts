import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ENV} from "../../app/main.dev";
import {AnimalsService} from "../../app/services/animals-service";
import {Animal} from "../../app/domain/animal";
import {AnimalDetails} from "../animal-details/animal-details";

@Component({
  selector: 'page-animals',
  templateUrl: 'animals.html'
})
export class Animals {
  animals: Array<Animal> = [];
  errorMessage: string;
  baseUrl: String = ENV.API_URL;

  constructor(public navCtrl: NavController, public animalsService: AnimalsService) {
    this.loadAnimals();
  }

  goToDetails(animal) {
    this.navCtrl.push(AnimalDetails, {
      animalId: animal.id
    });
  }

  private loadAnimals() {
    this.animalsService.load()
      .subscribe(
        animals => this.animals = animals,
        error =>  this.errorMessage = <any>error);
  }
}
