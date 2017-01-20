import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AnimalsService} from "../../app/services/animals-service";
import {Animal} from "../../app/domain/animal";
import {AnimalDetails} from "../animal-details/animal-details";
import {ENV} from "../../app/app.module";

@Component({
  selector: 'page-animals',
  templateUrl: 'animals.html'
})
export class Animals {
  title: String = "Les animaux du Parc";
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
        animals => this.animals = animals.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ),
        error =>  this.errorMessage = <any>error);
  }
}
