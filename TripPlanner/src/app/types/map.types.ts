import { Icon } from 'leaflet';

export interface MapIcon {
  name: string;
  marker: Icon;
  matIcon: string;
}

export interface MapIcons {
  city: MapIcon;
  hotel: MapIcon;
  poi: MapIcon;
  airplane: MapIcon;
  ship: MapIcon;
  train: MapIcon;
  bus: MapIcon;
  car: MapIcon;
  taxi: MapIcon;
}

export enum MapIconType {
  CITY = 'city',
  HOTEL = 'hotel',
  POI = 'poi',
  AIRPLANE = 'airplane',
  SHIP = 'ship',
  TRAIN = 'train',
  BUS = 'bus',
  CAR = 'car',
  TAXI = 'taxi',
}
