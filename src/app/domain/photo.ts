import {DateTime} from "ionic-angular";
export class Photo {
    id: String;
    animalIds: Array<String> = [];
    speciesIds: Array<String> = [];
    binaryId: String;
    title: String;
    liked: number = 0;
    lastModified: DateTime;
}
