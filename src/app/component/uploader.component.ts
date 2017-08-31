import {Camera} from "ionic-native";
import {LoadingController, ViewController, AlertController} from "ionic-angular";
import {Component, OnInit} from "@angular/core";
import {Photo} from "../domain/photo";
import {DomSanitizer} from "@angular/platform-browser";
import {PhotosService} from "../services/photos-service";
import {AnimalsService} from "../services/animals-service";
import {SpeciesService} from "../services/species-service";
import {Animal} from "../domain/animal";
import {Specie} from "../domain/specie";

@Component({
  template:`
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Envoyer une photo
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <div class="modal-content">
        <ion-label color="primary" class="label" stacked>Sélection de l'image à envoyer</ion-label>
        <div class="preview">
          <img class="img" *ngIf="mode == 'pick'" [src]="domSanatizer.bypassSecurityTrustUrl(imageUri)"/>
          <i *ngIf="mode == 'pick'">La photo peut apparaître avec une mauvaise orientation, cela sera corrigé après l'envoi.</i>
        </div>       
        <div class="buttons">
          <button ion-button (click)="pick()"><ion-icon name="image"> Galerie</ion-icon></button>
          <!--<button ion-button (click)="capture()"><ion-icon name="camera"> Appareil</ion-icon></button>-->
          <button [disabled]="isNotSendable()" ion-button color="secondary" (click)="send()">Envoyer</button>
        </div>
        <div *ngIf="pic">
          <ion-label color="primary" stacked>Ajouter un titre</ion-label>
          <ion-input [(ngModel)]="pic.title" placeholder="Saisir un titre"></ion-input>
          <ion-label color="primary" stacked>Tagger un animal ?</ion-label>
          <button ion-button color="primary" (click)="chooseAnimals()">Choisir un animal</button>
          <div *ngIf="pic.animalIds.length > 0">
            <animal-summary *ngFor="let animalId of pic.animalIds"
                            [id]="animalId"
                            [clickable]="false">
            </animal-summary>
          </div>
          <div class="breaker"></div>
          <ion-label color="primary" stacked>Tagger une espèce ?</ion-label>
          <button ion-button color="primary" (click)="chooseSpecies()">Choisir une espèce</button>
          <div *ngIf="pic.speciesIds.length > 0">
            <specie-summary *ngFor="let specieId of pic.speciesIds"
                            [id]="specieId"
                            [clickable]="false">
            </specie-summary>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .modal-content {
      padding: 20px;
    }
    .modal-content .label {
      margin-bottom: 10px;
    }
    .preview {
      width: 100%;
      max-height: 250px;
    }
    .buttons {
      text-align: center;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    .preview .img {
      max-height: 250px;
    }
    .preview i {
      display: block;
    }
    .breaker {
      display: block;
      width: 100%;
      height: 5px;
      margin-top: 30px;
    }
  `]
})
export class Uploader implements OnInit {
  imageUri: string;
  mode: string;
  pic: Photo;
  animals: Array<Animal> = [];
  species: Array<Specie> = [];

  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController,
              private alertCtrl: AlertController, private domSanatizer: DomSanitizer,
              private photosService: PhotosService, private animalService: AnimalsService,
              private specieService: SpeciesService) {
  }

  ngOnInit(): void {
    this.animalService.load().subscribe(
      animals => animals.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ).forEach(_a => this.animals.push(_a)),
      err => console.log(err)
    );
    this.specieService.load().subscribe(
      species => species.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ).forEach(_s => this.species.push(_s)),
      err => console.log(err)
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  pick() {
    var options = this.setOptions(Camera.PictureSourceType.SAVEDPHOTOALBUM);

    Camera.getPicture(options).then(d => this.handleResult(d), (err) => {
      console.debug("Unable to obtain picture: " + err, "app");
    });
  }

  capture() {
    var options = this.setOptions(Camera.PictureSourceType.CAMERA);
    Camera.getPicture(options).then(d => this.handleResult(d), (err) => {
      console.debug("Unable to obtain picture: " + err, "app");
    });
  }

  isNotSendable() {
    if (!this.pic) {
      return true;
    } else if (this.pic && this.pic.title.length == 0) {
      return true;
    }
    return false;
  }

  chooseAnimals() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Quel animal apparaît sur l\'image ?');

    this.animals.forEach(a =>
      alert.addInput({
        type: 'checkbox',
        label: a.name,
        value: a.id,
        checked: this.pic.animalIds.indexOf(a.id) > -1
      })
    );
    alert.addButton('Annuler');
    alert.addButton({
      text: 'Ajouter',
      handler: data => {
        this.pic.animalIds = [];
        data.forEach(id => this.pic.animalIds.push(id));
      }
    });
    alert.present();
  }

  chooseSpecies() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Quelle espèce apparaît sur l\'image ?');

    this.species.forEach(s =>
      alert.addInput({
        type: 'checkbox',
        label: s.name,
        value: s.id,
        checked: this.pic.speciesIds.indexOf(s.id) > -1
      })
    );
    alert.addButton('Annuler');
    alert.addButton({
      text: 'Ajouter',
      handler: data => {
        this.pic.speciesIds = [];
        data.forEach(id => this.pic.speciesIds.push(id));
      }
    });
    alert.present();
  }

  private handleResult(d: any) {
    //console.log(d);
    this.imageUri = d;
    this.mode = 'pick';
    this.pic = new Photo();
    this.pic.title = '';
  }

  private setOptions(srcType) {
    return {
      destinationType: Camera.DestinationType.NATIVE_URI,
      sourceType: srcType,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false//,
      //correctOrientation: true  //Corrects Android orientation quirks but create new image
    };
  }

  send() {
    this.photosService.create(this.pic).subscribe(
      picture => this.uploadBinary(picture),
      error =>  this.handleError(error)
    );
  }

  private uploadBinary(picture: Photo) {
    this.photosService.upload(picture, this.imageUri).then(
      res => this.complete(res)
    );
  }

  private complete(error : any) {
    if (error === 'No geolocation found.') {
      this.showCompleteAlert("Envoi refusé, la photo ne semble pas avoir été prise dans le zoo. Veillez à activer la géolocalisation.");
    } else if (error && error.length > 0) {
      this.showCompleteAlert(error);
    } else {
      this.showCompleteAlert("Envoi réussi.");
    }
  }

  private showCompleteAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'OK',
        handler: data => {
          this.dismiss();
        }
      }]
    });
    alert.present();
  }

  private handleError(error: any) {
    let alert = this.alertCtrl.create({
      title: "Une erreur s'est produite, veuillez réessayer plus tard.",
      buttons: ['Annuler']
    });
    alert.present();
  }
}
