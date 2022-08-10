import { Injectable } from '@angular/core';
import { PlaceOfService, KeyValue} from '../interfaces/search-data'

@Injectable({
  providedIn: 'root'
})
export class ServicePlaceService {

  constructor() { }

  getServicePlaceTypeArray(): KeyValue[]{
    const servicePlaceValues: KeyValue[] = [];
    for (let servicePlaceKey of Object.keys(PlaceOfService)){
      servicePlaceValues.push({ key: servicePlaceKey, value: PlaceOfService[servicePlaceKey]});
    }
    return servicePlaceValues;
  }
}
