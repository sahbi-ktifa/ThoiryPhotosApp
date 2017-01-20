import {Component, OnInit} from "@angular/core";
import {ModalController, ViewController, Platform, LoadingController, AlertController} from "ionic-angular";
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'auth',
  template:`
    <span class="auth-component">
      <ion-icon *ngIf="username" name="person"> {{username}}</ion-icon>
      <ion-icon *ngIf="!username" name="help" (click)="register()"></ion-icon>
    </span>
  `,
  styles: [`
    .auth-component {
      position: absolute;
      right: 10px;
      top: 20px;
    }
  `]
})

export class AuthComponent implements OnInit {
  username: String;

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.checkAuth();
    });
  }

  constructor(public modalCtrl: ModalController, private platform: Platform) {
    this.platform = platform;
  }

  register() {
    let registerModal = this.modalCtrl.create(Register);
    registerModal.onDidDismiss(data => {
      this.checkAuth();
    });
    registerModal.present();
  }

  private checkAuth() {
    //if (this.platform.is('mobileweb')) {
      let user = localStorage.getItem('user');
      if (user) {
        this.username = JSON.parse(user).username;
      }
    /*} else {
      NativeStorage.getItem('user')
        .then(
          data => this.username = data.user,
          error => console.error(error)
        );
    }*/
  }
}

@Component({
  template:`
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Mon utilisateur
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
        <ion-label color="primary" stacked>Choisir un nom d'utilisateur</ion-label>
        <ion-input [(ngModel)]="username" placeholder="Saisir un nom d'utilisateur"></ion-input>
        <button  [disabled]="!username || username.length < 4" ion-button (click)="register()">S'enregistrer</button>
        <ion-label color="primary" stacked>Pourquoi s'enregistrer ?</ion-label>
        <ul>
          <li>Un compte utilisateur permet de "liker" les photos par un double tap</li>
          <li>Un compte utilisateur ne nécessite qu'un nom d'utilisateur unique.</li>
          <li>Un compte utilisateur permet de partager des photos (NB: En partageant une photo, j'accepte de céder les droits de ma photo)</li>         
        </ul>
      </div>
    </ion-content>
  `,
  styles: [`
    .modal-content {
      padding: 20px;
    }
  `]
})
export class Register {
  username: String;

  constructor(public platform: Platform, public loadingCtrl: LoadingController,
              public viewCtrl: ViewController, public authService: AuthService,
              private alertCtrl: AlertController) {
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: 'Veuillez patienter...'
    });
    loading.present();
    this.authService.register(this.username).subscribe(
      passwd => this.completeRegistration(passwd, loading),
      error =>  this.handleError(error, loading)
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private completeRegistration(passwd: String, loading) {
    loading.dismiss();
    this.authService.storeUser(this.username, passwd);
    let alert = this.alertCtrl.create({
      title: "Enregistrement complet",
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
      title: "Utilisateur déjà existant",
      buttons: ['Annuler']
    });
    alert.present();
  }
}

