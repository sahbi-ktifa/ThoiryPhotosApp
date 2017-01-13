import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";

import {NativeStorage} from "ionic-native";
import {Platform} from "ionic-angular";
import {ENV} from "../app.module";

/*
  Generated class for the SpeciesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: Http, private platform: Platform) {
    this.platform = platform;
  }

  register(username: String): Observable<any> {
    return this.http.post(ENV.API_URL + "/common/register", username)
      .map(AuthService.extractData)
      .catch(AuthService.handleError);
  }

  storeUser(username: String, passwd: String) {
    if (this.platform.is('mobileweb')) {
      localStorage.setItem('user', JSON.stringify({username: username, passwd: passwd}));
    } else {
      NativeStorage.setItem('user', {username: username, passwd: passwd});
    }
  }

  retrieveUser() {
    if (this.platform.is('mobileweb')) {
      return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    } else {
      //todo : use NativeStorage
    }
  }

  private static extractData(res: Response) {
    return res.text();
  }

  private static handleError (error: Response | any) {
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
