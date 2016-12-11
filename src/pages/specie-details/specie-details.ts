import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Specie} from "../../app/domain/specie";
import {SpeciesService} from "../../app/services/species-service";

@Component({
  selector: 'specie-details',
  templateUrl: 'specie-details.html'
})
export class SpecieDetails {
  specie: Specie = new Specie();
  specieUrl: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public speciesService: SpeciesService) {
    if (navParams.get('specieId')) {
      this.speciesService.retrieveSpecie(navParams.get('specieId'))
        .subscribe(
          specie => this.init(specie),
          error =>  console.log(error));
    }
  }

  private init(specie: Specie) {
      this.specie = specie;
      this.specieUrl = "http://localhost:8080/common/specie/" + specie.id + "/preview?format=THUMB";
  }

}
