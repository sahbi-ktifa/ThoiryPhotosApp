import {Component, Input} from "@angular/core";
import {ENV} from "../main.dev";
import {PhotosService} from "../services/photos-service";
import {Platform, Events} from "ionic-angular";
import {AuthService} from "../services/auth-service";
import {Photo} from "../domain/photo";

@Component({
  selector: 'picture',
  template:`
    <picture-likable [id]="pic.id"></picture-likable>
    <div class="infos">
      <span class="infos">{{pic.title}} - {{pic.creationDate | date:'dd/MM/yyyy'}} - <picture-liked [liked]="pic.liked" [id]="pic.id"></picture-liked></span>
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
  styles: []
})

export class PictureComponent {
  @Input('picture') pic: Photo;

  constructor() {

  }
}
