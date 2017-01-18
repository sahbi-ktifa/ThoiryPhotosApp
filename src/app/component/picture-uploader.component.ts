import {Component, OnInit} from "@angular/core";
import {AlertController, ModalController} from "ionic-angular";
import {Uploader} from "./uploader.component";

@Component({
  selector: 'picture-uploader',
  template:`
    <button ion-button>
      <ion-icon name="cloud-upload" (click)="doUpload()"></ion-icon>
    </button>    
  `,
  styles: []
})

export class PictureUploaderComponent implements OnInit {
  username: String;

  ngOnInit(): void {
    this.checkAuth();
  }

  private checkAuth() {
    let user = localStorage.getItem('user');
    if (user) {
      this.username = JSON.parse(user).username;
    }
  }

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController) {

  }

  doUpload() {
    this.checkAuth();
    if (!this.username) {
      let alert = this.alertCtrl.create({
        title: "Vous devez vous authentifier pour effectuer cette action, cliquer sur l'icône en haut en droite.",
        buttons: ['OK']
      });
      alert.present();
    } else {
      let uploaderModal = this.modalCtrl.create(Uploader);
      uploaderModal.present();
    }
  }
}
