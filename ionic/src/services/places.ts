import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from '@ionic-native/file';

import { Place } from "../models/place";
import { Location } from "../models/location";

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage) {}

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(
        err => {
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places != null ? places : [];
          return this.places;
        }
      )
      .catch(
        err => console.log(err)
      );
  }
}
