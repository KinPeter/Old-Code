export enum PetType {
  DOG = 'Kutya',
  CAT = 'Macska',
  BIRD = 'Madár',
  RODENT = 'Rágcsáló',
  REPTILE = 'Hüllő'
}

export enum PlaceOfService {
  SITTERS_HOME = 'KiVi otthona',
  OWNERS_HOME = 'Kisállattulajdonos otthona'
}

export interface SearchData {
  name: string;
  postalCode: string;
  place: PlaceOfService;
  petType: PetType;
}

export interface KeyValue {
  key: string;
  value: string;
}
