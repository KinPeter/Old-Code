import { Injectable } from '@angular/core'
import { Map, Marker, LatLng, Polyline, LeafletMouseEvent, LeafletEventHandlerFn } from 'leaflet'
import { Maps } from 'keys'

import { MapIcons } from '~/app/types/map.types'
import { Coords } from '~/app/types/trip.types'
import { mapIcons } from '~/app/utils/map-icons'
declare let L

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public static readonly mapIcons: MapIcons = mapIcons
  private markers: Marker[] = []
  private map: Map

  constructor() {}

  public getLastMarkerCoords(): Coords {
    const lastMarker = this.markers[this.markers.length - 1]
    return {
      lat: lastMarker.getLatLng().lat,
      lon: lastMarker.getLatLng().lng
    }
  }

  public initMap(center: Coords, zoom: number): void {
    this.map = L.map('main-map').setView([center.lat, center.lon], zoom)

    // FREE OPENSTREETMAP tiles
    L.tileLayer(Maps.OPENSTREETMAP_URL, {
      attribution: Maps.OPENSTREETMAP_ATTR
    }).addTo(this.map)

    // MAPTILER tiles, limited to 100k tile requests / month
    // L.tileLayer(Maps.MAPTILER_URL + Maps.MAPTILER_APIKEY, { attribution: Maps.MAPTILER_ATTR }).addTo(this.map);

    // const marker = L.marker([center.lat, center.lon], {
    //   icon: mapIcons.city.marker,
    // }).addTo(this.map);
    // marker.bindPopup("<b>Hello world!</b><br>I'm in Budapest.").openPopup();
    // this.markers.push(marker);
  }

  public setMapView(center: Coords, zoom: number): void {
    this.map.setView([center.lat, center.lon], zoom)
  }

  public handleResize(): void {
    setTimeout(() => {
      this.map.invalidateSize(true)
    }, 300)
  }

  public addEventListenerToMap(eventType: string, handler: LeafletEventHandlerFn): void {
    this.map.on(eventType, handler)
  }

  public addMarker(loc: Coords, type: string, name: string): void {
    const marker: Marker = L.marker([loc.lat, loc.lon], {
      icon: mapIcons[type].marker,
      riseOnHover: true
    })
      .addTo(this.map)
      .bindPopup(name)
      .on('click', (event: LeafletMouseEvent) => {
        console.log('Marker click', event)
      })
    this.markers.push(marker)
  }

  public removeMarker(loc: Coords): void {
    let latlng: LatLng
    const markerIndex: number = this.markers.findIndex((m: Marker) => {
      latlng = m.getLatLng()
      return loc.lat === latlng.lat && loc.lon === latlng.lng
    })
    this.markers[markerIndex].removeFrom(this.map)
    this.markers.splice(markerIndex, 1)
    console.log(this.markers)
  }

  public drawPath(from: Coords, to: Coords): void {
    const latlngs = [[...Object.values(from)], [...Object.values(to)]]
    const polyline: Polyline = L.polyline(latlngs, {
      color: '#FF5722',
      weight: 5,
      dashArray: '10, 15',
      dashOffset: '10'
    }).addTo(this.map)
    console.log(polyline)
    // this.map.fitBounds(polyline.getBounds());
  }
}
