import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-species',
  templateUrl: 'species.html'
})
export class Species {
  selectedSpeciesId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.get('speciesId')) {
      this.selectedSpeciesId = navParams.get('speciesId');
    }
  }

}
