import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {Photos} from "../pages/photos/photos";
import {Species} from "../pages/species/species";
import {SpecieDetails} from "../pages/specie-details/specie-details";
import {SpeciesService} from "./services/species-service";
import {PhotosService} from "./services/photos-service";
import {SpecieSummaryComponent} from "./component/specie-summary.component";
import {AnimalsService} from "./services/animals-service";
import {AnimalDetails} from "../pages/animal-details/animal-details";
import {Animals} from "../pages/animals/animals";
import {AnimalSummaryComponent} from "./component/animal-summary.component";
import {PictureLikableComponent} from "./component/picture-likable.component";
import {AuthComponent, Register} from "./component/auth.component";
import {AuthService} from "./services/auth-service";
import {PictureLikedComponent} from "./component/picture-liked.component";
import {PictureComponent} from "./component/picture.component";
import {PictureUploaderComponent} from "./component/picture-uploader.component";
import {Uploader} from "./component/uploader.component";

@NgModule({
  declarations: [
    MyApp,
    Photos,
    Species,
    SpecieDetails,
    SpecieSummaryComponent,
    Animals,
    AnimalDetails,
    AnimalSummaryComponent,
    PictureComponent,
    PictureLikableComponent,
    PictureLikedComponent,
    AuthComponent,
    Register,
    PictureUploaderComponent,
    Uploader
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Photos,
    Species,
    SpecieDetails,
    SpecieSummaryComponent,
    Animals,
    AnimalDetails,
    AnimalSummaryComponent,
    PictureComponent,
    PictureLikableComponent,
    PictureLikedComponent,
    AuthComponent,
    Register,
    PictureUploaderComponent,
    Uploader
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SpeciesService, PhotosService, AnimalsService, AuthService]
})
export class AppModule {}

export const ENV = {
  API_URL    : 'http://thoiryphotos-production.herokuapp.com',
  API_GEOLOC_URL    : 'https://image-geoloc.herokuapp.com/api/geo/within'
  //API_URL    : 'http://localhost:8080'
};
