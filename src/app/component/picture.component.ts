import {Component, Input} from "@angular/core";

import {PhotosService} from "../services/photos-service";
import {Platform, Events} from "ionic-angular";
import {AuthService} from "../services/auth-service";
import {Photo} from "../domain/photo";

@Component({
  selector: 'picture',
  template:`
    <div class="title">{{pic.title}}</div> 
    <picture-likable [id]="pic.id"></picture-likable>
    <div class="infos">
      <div class="infos">Par <span class="user">{{pic.username}}</span> - <span class="date">{{calcInterval(pic.creationDate)}}</span> <picture-liked [liked]="pic.liked" [id]="pic.id"></picture-liked></div>
      <div class="animals" *ngIf="pic.animalIds.length > 0">
          <animal-summary *ngFor="let animalId of pic.animalIds"
                [id]="animalId">
          </animal-summary>
      </div>
      <div class="species" *ngIf="pic.speciesIds.length > 0">
          <specie-summary *ngFor="let specieId of pic.speciesIds"
                          [id]="specieId">
          </specie-summary>
      </div>
    </div>    
  `,
  styles: [`
    .infos .infos .user {
      font-style: italic;
      color: #82abc3;
    }
    .infos .infos .date {
      color: #b7b7b7;
      float: right;
    }
  `]
})

export class PictureComponent {
  @Input('picture') pic: Photo;

  constructor() {

  }

  public calcInterval(date) {
    let dayInterval = this.dayDiff(new Date(date));
    return Number(dayInterval) > 0 ? "Il y a " + dayInterval + " jour(s)" : this.calcDayInterval(date);
  }

  private calcDayInterval(date) {
    let val = Math.round(Math.abs((date - new Date().getTime()) / 3600000));
    return val > 0 ? "Il y a " + val + " heure(s)" : "Maintenant";
  }

  private dayDiff(d1)
  {
    d1 = d1.getTime() / 86400000;
    let d2 = new Date().getTime() / 86400000;
    return Number(d2 - d1).toFixed(0);
  }
}
