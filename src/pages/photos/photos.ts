import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Species } from '../species/species';

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class Photos {

  constructor(public navCtrl: NavController) {

  }

  goTo() {
    this.navCtrl.push(Species, {
      speciesId: "1"
    });
  }
}
