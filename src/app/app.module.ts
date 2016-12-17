import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {Photos} from "../pages/photos/photos";
import {Species} from "../pages/species/species";
import {SpecieDetails} from "../pages/specie-details/specie-details";
import {SpeciesService} from "./services/species-service";
import {PhotosService} from "./services/photos-service";
import {SpecieSummaryComponent} from "./component/specie-summary.component";

@NgModule({
  declarations: [
    MyApp,
    Photos,
    Species,
    SpecieDetails,
    SpecieSummaryComponent
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
    SpecieSummaryComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SpeciesService, PhotosService]
})
export class AppModule {}
