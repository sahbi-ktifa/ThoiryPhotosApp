import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SpecieDetails} from "../specie-details/specie-details";
import {Specie} from "../../app/domain/specie";
import {SpeciesService} from "../../app/services/species-service";
import {ENV} from "../../app/app.module";


@Component({
  selector: 'page-species',
  templateUrl: 'species.html'
})
export class Species {
  title: String = "Les espèces du Parc";
  species: Array<Specie> = [];
  errorMessage: string;
  baseUrl: String = ENV.API_URL;

  constructor(public navCtrl: NavController, public speciesService: SpeciesService) {
    this.loadSpecies();
  }

  goToDetails(specie) {
    this.navCtrl.push(SpecieDetails, {
      specieId: specie.id
    });
  }

  private loadSpecies() {
    this.speciesService.load()
      .subscribe(
        species => this.species = species.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ),
        error =>  this.errorMessage = <any>error);
  }
}
