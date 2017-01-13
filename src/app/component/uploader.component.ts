import {Camera} from "ionic-native";
import {LoadingController, ViewController, AlertController} from "ionic-angular";
import {Component} from "@angular/core";
import {Photo} from "../domain/photo";

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
        <ion-label color="primary" stacked>Sélection de l'image à envoyer</ion-label>
        <div class="preview">
          <img *ngIf="mode == 'capture'" src="{{base64Image}}"/>
          <img *ngIf="mode == 'pick'" src="{{imageUri}}"/>          
        </div>       
        <div class="buttons">
          <button ion-button (click)="pick()"><ion-icon name="image"> Galerie</ion-icon></button>
          <button ion-button (click)="capture()"><ion-icon name="camera"> Appareil</ion-icon></button>
        </div>
        <button  [disabled]="!pic" ion-button (click)="send()">Envoyer</button>
      </div>
    </ion-content>
  `,
  styles: [`
    .modal-content {
      padding: 20px;
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

  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController, private alertCtrl: AlertController) {
  }

  send() {
    let loading = this.loadingCtrl.create({
      content: 'Veuillez patienter...'
    });
    loading.present();
    /*this.authService.register(this.username).subscribe(
     passwd => this.complete(passwd, loading),
     error =>  this.handleError(error, loading)
     );*/
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  pick() {
    var options = this.setOptions(Camera.PictureSourceType.SAVEDPHOTOALBUM);

    Camera.getPicture(options).then((imageUri) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageUri = imageUri;
      this.mode = 'pick';
    }, (err) => {
      console.debug("Unable to obtain picture: " + err, "app");
    });
  }

  capture() {
    var options = this.setOptions(Camera.PictureSourceType.CAMERA);

    Camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.mode = 'capture';
    }, (err) => {
      console.debug("Unable to obtain picture: " + err, "app");
    });
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

  private complete(res: any, loading) {
    loading.dismiss();
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

  private handleError(error: any, loading) {
    loading.dismiss();
    let alert = this.alertCtrl.create({
      title: "Une erreur s'est produite, veuillez réessayer plus tard.",
      buttons: ['Annuler']
    });
    alert.present();
  }
}
