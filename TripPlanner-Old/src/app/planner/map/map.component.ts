import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LeafletMouseEvent } from 'leaflet';

import { Coords, Trip } from '~/app/types/trip.types';
import { MapIconType } from '~/app/types/map.types';
import { MapService } from '~/app/services/maps/map.service';
import { TripService } from '~/app/services/trips/trip.service';
import { LocationService } from '~/app/services/locations/location.service';

@Component({
  selector: 'tp-map',
  template: `
    <div class="map-container">
      <button
        *ngIf="mapView"
        mat-mini-fab
        class="toggle-btn"
        color="accent"
        matTooltip="Toggle Planner"
        (click)="toggleMapView.emit()"
      >
        <mat-icon>edit</mat-icon>
      </button>

      <div class="map" id="main-map" [class.map-view]="mapView"></div>
    </div>
  `,
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .map-container .toggle-btn {
        margin: 0.8rem 0.6rem;
      }

      .map-container .map {
        position: absolute;
        top: 0;
        right: 0;
        transition: all 0.3s ease;
        width: 100%;
        height: 100%;
      }

      .map-container .map.map-view {
        width: calc(100vw - 120px);
      }

      .map-container .map:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 5px;
        box-shadow: inset 2px 0 3px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class MapComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() mapView: boolean;

  @Output() toggleMapView: EventEmitter<void> = new EventEmitter<void>();

  public currentPosition: Coords = { lat: null, lon: null };

  public trip: Trip;

  constructor(
    private ms: MapService,
    private tripService: TripService,
    private locationService: LocationService,
  ) {}

  ngOnInit() {
    this.ms.initMap({ lat: 47.496, lon: 19.044 }, 10);
    this.ms.addEventListenerToMap('click', this.onMapClick.bind(this));
    this.subscriptions.push(
      this.tripService.trip.subscribe(data => {
        this.trip = data;
        this.setViewToCountry();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onClick() {
    const prevMarker: Coords = this.ms.getLastMarkerCoords();
    this.ms.addMarker(
      { lat: this.currentPosition.lat, lon: this.currentPosition.lon },
      MapIconType.POI,
      'Test',
    );
    this.ms.drawPath(prevMarker, this.currentPosition);
  }

  onRemove() {
    this.ms.removeMarker({
      lat: this.currentPosition.lat,
      lon: this.currentPosition.lon,
    });
  }

  onMapClick(event: LeafletMouseEvent) {
    this.currentPosition.lat = event.latlng.lat;
    this.currentPosition.lon = event.latlng.lng;
    console.log(this.currentPosition);
    this.onClick();
  }

  private async setViewToCountry(): Promise<void> {
    const country = this.trip.countries[0];
    if (!country) return;
    const coords = await this.locationService.getCoordinatesOfCountry(country);
    if (!coords) return;
    this.ms.setMapView(coords, 5);
  }
}
