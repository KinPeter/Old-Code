import { Injectable } from '@angular/core';
import { PetType, KeyValue} from '../interfaces/search-data'

@Injectable({
  providedIn: 'root'
})
export class PettypeService {

  constructor() { }

  getPetTypeArray(): KeyValue[]{
    const petTypeValues: KeyValue[] = [];
    for (let petTypeKey of Object.keys(PetType)){
      petTypeValues.push({ key: petTypeKey, value: PetType[petTypeKey]});
    }
    return petTypeValues;
  }
}
