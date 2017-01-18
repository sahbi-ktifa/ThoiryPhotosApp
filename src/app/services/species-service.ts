import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {Specie} from "../domain/specie";
import {ENV} from "../app.module";
import {LoadingController} from "ionic-angular";


/*
  Generated class for the SpeciesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SpeciesService {

  constructor(public http: Http, private loadingCtrl: LoadingController) {
  }

  load(): Observable<Specie[]> {
    let loading = this.loadingCtrl.create({
      content: 'Veuillez patienter...'
    });
    loading.present();
    return this.http.get(ENV.API_URL + "/common/specie")
      .map(d => SpeciesService.extractData(d, loading))
      .catch(e => SpeciesService.handleError(e, loading));
  }

  retrieveSpecie(specieId: String) : Observable<Specie> {
    return this.http.get(ENV.API_URL + "/common/specie/" + specieId)
      .map(d => SpeciesService.extractData(d, false))
      .catch(e => SpeciesService.handleError(e, false));
  }

  retrieveSpecieAnimals(specieId: string) {
    return this.http.get(ENV.API_URL + "/common/specie/" + specieId + "/animals")
      .map(d => SpeciesService.extractData(d, false))
      .catch(e => SpeciesService.handleError(e, false));
  }

  private static extractData(res: Response, loading) {
    if (loading) {
      loading.dismiss();
    }
    return res.json() || { };
  }

  private static handleError (error: Response | any, loading) {
    if (loading) {
      loading.dismiss();
    }
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
