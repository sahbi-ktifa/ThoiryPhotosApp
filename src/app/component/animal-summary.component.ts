import {Component, Input, OnInit} from "@angular/core";
import {ENV} from "../main.dev";
import {NavController} from "ionic-angular";
import {AnimalsService} from "../services/animals-service";
import {AnimalDetails} from "../../pages/animal-details/animal-details";
import {Animal} from "../domain/animal";

@Component({
  selector: 'animal-summary',
  template:`
    <span class="animal-summary" *ngIf="animal" (click)="goToAnimal()">
        <img src="{{animalUrl}}" />
        <span class="name">{{animal.name}}</span>
    </span>
  `,
  styles: [`
    .animal-summary {
      height: 30px;
      float: left;
      background: #F5CB97;
      padding: 5px;
      border-radius: 5px;
      margin-right: 5px;
    }
    .animal-summary img {
      width: 20px;
      height: 20px;
    }
    .animal-summary span {
      font-size: 10px;
      color: lightslategrey;
    }
  `]
})

export class AnimalSummaryComponent implements OnInit {
  @Input('id') animalId: String;
  animal: Animal;
  animalUrl: String;

  ngOnInit(): void {
    console.log(this.animalId);
    this.getAnimal();
  }

  constructor(public navCtrl: NavController, private animalsService: AnimalsService) {
  }

  getAnimal(): void {
    this.animalsService.retrieveAnimal(this.animalId)
      .subscribe(
        animal => this.init(animal),
        error =>  console.log(error));
  }

  goToAnimal(): void {
    this.navCtrl.push(AnimalDetails, {
      animalId: this.animalId
    });
  }

  private init(animal: Animal) {
    this.animal = animal;
    this.animalUrl = ENV.API_URL + "/common/animal/" + animal.id + "/preview?format=THUMB";
    console.log(this.animalUrl);
  }

}
