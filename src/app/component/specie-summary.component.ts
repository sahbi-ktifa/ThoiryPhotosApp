import {Component, Input, OnInit} from "@angular/core";
import {SpeciesService} from "../services/species-service";
import {Specie} from "../domain/specie";
import {ENV} from "../main.dev";
import {SpecieDetails} from "../../pages/specie-details/specie-details";
import {NavController} from "ionic-angular";

@Component({
  selector: 'specie-summary',
  template:`
    <span class="specie-summary" *ngIf="specie" (click)="goToSpecie()">
        <img src="{{specieUrl}}" />
        <span class="name">{{specie.name}}</span>
    </span>
  `,
  styles: [`
    .specie-summary {
      height: 30px;
      float: left;
      background: #f5f597;
      padding: 5px;
      border-radius: 5px;
    }
    .specie-summary img {
      width: 20px;
      height: 20px;
    }
    .specie-summary span {
      font-size: 10px;
      color: lightslategrey;
    }
  `]
})

export class SpecieSummaryComponent implements OnInit {
  @Input('id') specieId: String;
  specie: Specie;
  specieUrl: String;

  ngOnInit(): void {
    console.log(this.specieId);
    this.getSpecie();
  }

  constructor(public navCtrl: NavController, private speciesService: SpeciesService) {
  }

  getSpecie(): void {
    this.speciesService.retrieveSpecie(this.specieId)
      .subscribe(
        specie => this.init(specie),
        error =>  console.log(error));
  }

  goToSpecie(): void {
    this.navCtrl.push(SpecieDetails, {
      specieId: this.specieId
    });
  }

  private init(specie: Specie) {
    this.specie = specie;
    this.specieUrl = ENV.API_URL + "/common/specie/" + specie.id + "/preview?format=THUMB";
    console.log(this.specieUrl);
  }

}
