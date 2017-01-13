import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {Animal} from "../domain/animal";
import {ENV} from "../app.module";

/*
  Generated class for the SpeciesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AnimalsService {

  constructor(public http: Http) {
  }

  load(): Observable<Animal[]> {
    return this.http.get(ENV.API_URL + "/common/animal")
      .map(AnimalsService.extractData)
      .catch(AnimalsService.handleError);
  }

  retrieveAnimal(animalId: String) : Observable<Animal> {
    return this.http.get(ENV.API_URL + "/common/animal/" + animalId)
      .map(AnimalsService.extractData)
      .catch(AnimalsService.handleError);
  }

  retrieveAnimalSiblings(animalId: String) : Observable<Array<Animal>> {
    return this.http.get(ENV.API_URL + "/common/animal/" + animalId + "/siblings")
      .map(AnimalsService.extractData)
      .catch(AnimalsService.handleError);
  }

  private static extractData(res: Response) {
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
