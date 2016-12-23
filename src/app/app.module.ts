import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler, Modal} from "ionic-angular";
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
    PictureLikableComponent,
    PictureLikedComponent,
    AuthComponent,
    Register
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
    PictureLikableComponent,
    PictureLikedComponent,
    AuthComponent,
    Register
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SpeciesService, PhotosService, AnimalsService, AuthService]
})
export class AppModule {}
