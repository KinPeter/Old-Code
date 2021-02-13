export interface TripHeader {
  title: string;
  startingDate: Date;
  endingDate: Date;
  countries: string[];
}

export interface TripHeaderResource extends TripHeader {
  id: string;
  tripId: string;
  userId: string;
}

export interface Trip extends TripHeader {
  id?: string;
  days: Day[];
  // bounding: Coords[]; todo to set map bounding position
}

export interface CreateTripRequest extends TripHeader {
  json: string;
}

export interface TripResponse extends TripHeader {
  id: string;
  userId: string;
  json: string;
}

export interface Day {
  date: Date;
  cities: City[];
  transportation?: Transportation[];
  comments?: Comment[];
}

export interface Place {
  name: string;
  location: Coords;
  comments?: Comment[];
}

export interface City extends Place {
  places: Place[];
  accommodation?: Place;
}

export interface Transportation {
  from: City | Place;
  to: City | Place;
  by: TransportationType;
  comments?: Comment[];
}

export enum TransportationType {
  AIRPLANE = 'Airplane',
  TRAIN = 'Train',
  SHIP = 'Ship',
  BUS = 'Bus',
  CAR = 'Car',
  TAXI = 'Taxi',
}

export interface Comment {
  points?: string[];
  links?: Link[];
}

export interface Link {
  name: string;
  url: string;
}

export interface Coords {
  lat: number;
  lon: number;
}
