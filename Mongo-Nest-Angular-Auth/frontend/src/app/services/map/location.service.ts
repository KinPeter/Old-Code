import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

import { Locations } from 'keys'
import { LocationResponse } from '~/app/types/location.types'
import { Coords } from '~/app/types/trip.types'
import { LoadingIndicatorService } from '~/app/services/core/loading-indicator.service'
import { SnackbarService } from '~/app/services/core/snackbar.service'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private http: HttpClient,
    private loading: LoadingIndicatorService,
    private snackbar: SnackbarService
  ) {}

  public async getCoordinatesOfCountry(country: string): Promise<Coords | null> {
    const response = await this.getForwardGeocoding(country)
    const firstCountry = response.find(location => location.type === 'administrative')
    if (!firstCountry) return null
    return {
      lat: Number(firstCountry.lat),
      lon: Number(firstCountry.lon)
    }
  }

  private async getForwardGeocoding(searchQuery: string): Promise<LocationResponse[]> {
    this.loading.start()
    try {
      return await this.http
        .get<LocationResponse[]>(`${Locations.LOCATION_IQ_URL}`, {
          params: new HttpParams()
            .set('key', Locations.LOCATION_IQ_APIKEY)
            .set('format', 'json')
            .set('q', searchQuery)
            .set('normalizeaddress', '1')
        })
        .toPromise()
    } catch (error) {
      this.snackbar.error('Unable to get location coordinates')
      console.error(`[ERROR: LocationService GET getForwardGeocoding]`, error)
      return error
    } finally {
      this.loading.stop()
    }
  }
}
