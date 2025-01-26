import { Icon } from 'leaflet';
import { MapIcons } from '~/app/types/map.types';

declare let L;

const markerDetails = {
  iconSize: [28, 41],
  shadowSize: [44, 41],
  iconAnchor: [14, 41],
  shadowAnchor: [14, 40],
  popupAnchor: [0, -43],
  shadowUrl: '../../assets/map-markers/marker-shadow.png',
};

const mapMarkers: { [key: string]: Icon } = {
  poi: L.icon({
    iconUrl: '../../assets/map-markers/marker-poi.png',
    ...markerDetails,
  }),
  city: L.icon({
    iconUrl: '../../assets/map-markers/marker-city.png',
    ...markerDetails,
  }),
  hotel: L.icon({
    iconUrl: '../../assets/map-markers/marker-hotel.png',
    ...markerDetails,
  }),
  airplane: L.icon({
    iconUrl: '../../assets/map-markers/marker-airplane.png',
    ...markerDetails,
  }),
  train: L.icon({
    iconUrl: '../../assets/map-markers/marker-train.png',
    ...markerDetails,
  }),
  ship: L.icon({
    iconUrl: '../../assets/map-markers/marker-ship.png',
    ...markerDetails,
  }),
  bus: L.icon({
    iconUrl: '../../assets/map-markers/marker-bus.png',
    ...markerDetails,
  }),
  car: L.icon({
    iconUrl: '../../assets/map-markers/marker-car.png',
    ...markerDetails,
  }),
  taxi: L.icon({
    iconUrl: '../../assets/map-markers/marker-taxi.png',
    ...markerDetails,
  }),
};

export const mapIcons: MapIcons = {
  city: {
    name: 'city',
    marker: mapMarkers.city,
    matIcon: 'location_city',
  },
  hotel: {
    name: 'hotel',
    marker: mapMarkers.hotel,
    matIcon: 'hotel',
  },
  poi: {
    name: 'poi',
    marker: mapMarkers.poi,
    matIcon: 'star',
  },
  airplane: {
    name: 'airplane',
    marker: mapMarkers.airplane,
    matIcon: 'local_airport',
  },
  train: {
    name: 'train',
    marker: mapMarkers.train,
    matIcon: 'train',
  },
  ship: {
    name: 'ship',
    marker: mapMarkers.ship,
    matIcon: 'directions_boat',
  },
  bus: {
    name: 'bus',
    marker: mapMarkers.bus,
    matIcon: 'directions_bus',
  },
  car: {
    name: 'car',
    marker: mapMarkers.car,
    matIcon: 'directions_car',
  },
  taxi: {
    name: 'taxi',
    marker: mapMarkers.taxi,
    matIcon: 'local_taxi',
  },
};
