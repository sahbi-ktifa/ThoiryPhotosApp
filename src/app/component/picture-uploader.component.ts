import {Component, OnInit} from "@angular/core";
import {AlertController, ModalController} from "ionic-angular";
import {Uploader} from "./uploader.component";

@Component({
  selector: 'picture-uploader',
  template:`
     <ion-icon name="cloud-upload" (click)="doUpload()"></ion-icon>    
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
      let registerModal = this.modalCtrl.create(Uploader);
      registerModal.present();
    }
  }
}
