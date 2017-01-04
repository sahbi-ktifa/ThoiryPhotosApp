import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {ENV} from "../main.dev";
import {Photo} from "../domain/photo";
import {AuthService} from "./auth-service";

/*
  Generated class for the SpeciesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhotosService {

  constructor(public http: Http, private authService: AuthService) {
  }

  browse(page: number): Observable<any> {
    return this.http.get(ENV.API_URL + "/common/picture?page=" + page)
      .map(PhotosService.extractCommonData)
      .catch(PhotosService.handleError);
  }

  browseWithId(page: number, param: string, specieId: string): Observable<any> {
    return this.http.get(ENV.API_URL + "/common/picture?page=" + page + "&" + param + "=" + specieId)
      .map(PhotosService.extractCommonData)
      .catch(PhotosService.handleError);
  }

  like(picId: String): Observable<number> {
    let headers = new Headers();
    headers.append('Authorization','Basic ' + btoa(this.authService.retrieveUser().username + ':' + this.authService.retrieveUser().passwd));
    return this.http.post(ENV.API_URL + "/api/picture/" + picId + "/like", {}, {headers: headers})
      .map(PhotosService.extractCommonData)
      .catch(PhotosService.handleError);
  }

  private static extractCommonData(res: Response) {
    return res.json() || { };
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
