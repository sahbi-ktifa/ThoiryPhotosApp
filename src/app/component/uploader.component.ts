import {Camera} from "ionic-native";
import {LoadingController, ViewController, AlertController} from "ionic-angular";
import {Component} from "@angular/core";
import {Photo} from "../domain/photo";
import {DomSanitizer} from "@angular/platform-browser";
import {PhotosService} from "../services/photos-service";

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
          <img *ngIf="mode == 'capture'" [src]="domSanatizer.bypassSecurityTrustUrl(base64Image)"/>
          <img *ngIf="mode == 'pick'" [src]="imageUri"/>          
        </div>       
        <div class="buttons">
          <button ion-button (click)="pick()"><ion-icon name="image"> Galerie</ion-icon></button>
          <button ion-button (click)="capture()"><ion-icon name="camera"> Appareil</ion-icon></button>
        </div>
        <div *ngIf="pic">
          <ion-label color="primary" stacked>Ajouter une légende</ion-label>
          <ion-input [(ngModel)]="pic.title" placeholder="Saisir une légende"></ion-input>       
        </div>
        <button [disabled]="isNotSendable()" ion-button (click)="send()">Envoyer</button>
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
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class Uploader {
  base64Image: string;
  imageUri: string;
  mode: string;
  pic: Photo;

  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController,
              private alertCtrl: AlertController, private domSanatizer: DomSanitizer,
              private photosService: PhotosService) {
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
    } else if (this.pic && this.pic.title && this.pic.title.length == 0) {
      return true;
    }
    return false;
  }

  private handleResult(d: any) {
    if (d.indexOf('file://') > -1) {
      this.imageUri = d;
      this.mode = 'pick';
    } else {
      this.base64Image = 'data:image/jpeg;base64,' + d;
      this.mode = 'capture';
    }
    this.pic = new Photo();
    this.pic.title = '';
  }

  private setOptions(srcType) {
    return {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
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
      res => this.complete()
    );
  }

  private complete() {
    let alert = this.alertCtrl.create({
      title: "Envoi réussi",
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
