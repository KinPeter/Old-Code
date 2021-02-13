import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Locations } from 'keys';
import { UiService } from '~/app/services/ui.service';
import { LocationResponse } from '~/app/types/location.types';
import { Coords } from '~/app/types/trip.types';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient, private ui: UiService) {}

  public async getCoordinatesOfCountry(country: string): Promise<Coords | null> {
    const response = await this.getForwardGeocoding(country);
    const firstCountry = response.find(location => location.type === 'administrative');
    if (!firstCountry) return null;
    return {
      lat: Number(firstCountry.lat),
      lon: Number(firstCountry.lon),
    };
  }

  private async getForwardGeocoding(searchQuery: string): Promise<LocationResponse[]> {
    this.ui.startLoading();
    try {
      return await this.http
        .get<LocationResponse[]>(`${Locations.LOCATION_IQ_URL}`, {
          params: new HttpParams()
            .set('key', Locations.LOCATION_IQ_APIKEY)
            .set('format', 'json')
            .set('q', searchQuery)
            .set('normalizeaddress', '1'),
        })
        .toPromise();
    } catch (error) {
      this.ui.error('Unable to get location coordinates');
      console.error(`[ERROR: LocationService GET getForwardGeocoding]`, error);
      return error;
    } finally {
      this.ui.stopLoading();
    }
  }
}
