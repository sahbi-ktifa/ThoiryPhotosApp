import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service";
import {ENV} from "../app.module";
import {Loading, LoadingController} from "ionic-angular";
import {Photo} from "../domain/photo";
import {Transfer} from "ionic-native";

/*
  Generated class for the SpeciesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhotosService {

  constructor(public http: Http, private authService: AuthService,
              private loadingCtrl: LoadingController) {
  }

  browse(page: number): Observable<any> {
    let loading = this.buildLoading();
    return this.http.get(ENV.API_URL + "/common/picture?page=" + page)
      .map(d => PhotosService.extractCommonData(d, loading))
      .catch(e => PhotosService.handleError(e, loading));
  }

  browseWithId(page: number, param: string, specieId: string): Observable<any> {
    let loading = this.buildLoading();
    return this.http.get(ENV.API_URL + "/common/picture?page=" + page + "&" + param + "=" + specieId)
      .map(d => PhotosService.extractCommonData(d, loading))
      .catch(e => PhotosService.handleError(e, loading));
  }

  like(picId: String): Observable<number> {
    let loading = this.buildLoading();
    let headers = new Headers();
    headers.append('Authorization','Basic ' + btoa(this.authService.retrieveUser().username + ':' + this.authService.retrieveUser().passwd));
    return this.http.post(ENV.API_URL + "/api/picture/" + picId + "/like", {}, {headers: headers})
      .map(d => PhotosService.extractCommonData(d, loading))
      .catch(e => PhotosService.handleError(e, loading));
  }

  create(photo: Photo): Observable<Photo> {
    let loading = this.buildLoading();
    let headers = new Headers();
    headers.append('Authorization','Basic ' + btoa(this.authService.retrieveUser().username + ':' + this.authService.retrieveUser().passwd));
    return this.http.post(ENV.API_URL + "/api/picture/", photo, {headers: headers})
      .map(d => PhotosService.extractCommonData(d, loading))
      .catch(e => PhotosService.handleError(e, loading));
  }

  upload(picture: Photo, imageUri: string) : Promise<any> {
    let loading = this.buildLoading();
    return this.verifyGeoLoc(picture, imageUri, loading);
  }

  private doUpload(imageUri: string, picture: Photo, loading: Loading) {
    let ft = new Transfer();
    let filename = Math.round(Math.random() * 100000) + ".jpg";
    let options = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Content-Type': undefined,
        'Authorization': 'Basic ' + btoa(this.authService.retrieveUser().username + ':' + this.authService.retrieveUser().passwd)
      },
      params: {
        fileName: filename
      }
    };
    return ft.upload(imageUri, ENV.API_URL + "/api/picture/" + picture.id + '/binary', options, true)
      .then((result: any) => {
        loading.dismiss();
        return result;
      }).catch((error: any) => {
        loading.dismiss();
        return error;
      });
  }

  private verifyGeoLoc(picture: Photo, imageUri: string, loading: Loading) {
    let ft = new Transfer();
    let filename = Math.round(Math.random() * 100000) + ".jpg";
    let options = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      params: {
        fileName: filename,
        latitudeA: 48.87,
        longitudeA: 1.76,
        latitudeB: 48.85,
        longitudeB: 1.81
      }
    };
    return ft.upload(imageUri, ENV.API_GEOLOC_URL, options, true)
      .then((result: any) => {
        return this.doUpload(imageUri, picture, loading);;
      }).catch((error: any) => {
        loading.dismiss();
        return "No geolocation found.";
      });
  }

  private buildLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Veuillez patienter...'
    });
    loading.present();
    return loading;
  }

  private static extractCommonData(res: Response, loading) {
    loading.dismiss();
    return res.json() || { };
  }

  private static handleError (error: Response | any, loading) {
    loading.dismiss();
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
