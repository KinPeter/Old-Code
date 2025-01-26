import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'

import { Trip, TripBase, TripDto, TripResource } from '~/app/types/trip.types'
import { Store } from '~/app/services/core/store'
import { ApiService } from '~/app/services/core/api.service'
import { UserService } from '~/app/services/user/user.service'
import { TripsOrder } from '~/app/types/shared.types'
import { applyFilter, getFutureTrips, orderTrips } from '~/app/utils/trips.utils'
import { SnackbarService } from '~/app/services/core/snackbar.service'
import { createInitialDto } from '~/app/utils/trip.utils'
import { FileService } from '~/app/services/core/file.service'

interface MyTripsState {
  trips: Trip[]
  filteredTrips: Trip[]
}

const initialState: MyTripsState = {
  trips: [],
  filteredTrips: []
}

@Injectable({ providedIn: 'root' })
export class MyTripsService extends Store<MyTripsState> {
  public filteredTrips: Observable<Trip[]> = this.select(state => state.filteredTrips)

  private isFutureOnly = true
  private currentFilter: string = null
  private currentOrder: TripsOrder = null

  constructor(
    private api: ApiService,
    private userService: UserService,
    private snackbar: SnackbarService,
    private translate: TranslateService,
    private fileService: FileService
  ) {
    super(initialState)
  }

  public async fetchTrips(options = { resetFilters: false }): Promise<void> {
    const resources = await this.api.get<TripResource[]>(
      `/trips/all/${this.userService.currentUserId}`
    )
    if (!resources.length || resources instanceof HttpErrorResponse) return
    const trips = resources.map(r => Trip.fromResource(r))
    if (options.resetFilters) this.resetFilters()
    this.setState({
      trips: trips,
      filteredTrips: this.filterTrips(trips)
    })
  }

  public async createTrip(tripBase: TripBase): Promise<void> {
    const tripDto: TripDto = createInitialDto(tripBase)
    const response = await this.api.post<TripDto, TripResource>('/trips', tripDto)
    if (response instanceof HttpErrorResponse) return
    this.snackbar.success(await this.translate.get('myTrips.messages.tripCreated').toPromise())
    await this.fetchTrips()
  }

  public async updateTrip(id: string, updatedData: TripBase): Promise<void> {
    const trip = this.getTripById(id)
    const tripDto = trip.toDto()
    const updatedDto: TripDto = {
      ...tripDto,
      ...updatedData
    }
    const response = await this.api.put<TripDto, TripResource>(`/trips/${id}`, updatedDto, {
      handleError: true,
      errorMessage: await this.translate.get('myTrips.messages.tripUpdateError').toPromise()
    })
    if (response instanceof HttpErrorResponse) return
    this.snackbar.success(await this.translate.get('myTrips.messages.tripUpdated').toPromise())
    await this.fetchTrips()
  }

  public async duplicateTrip(id: string, title: string): Promise<void> {
    const original = this.getTripById(id)
    const tripDto = original.toDto()
    tripDto.title = title
    tripDto.coverImageUrl = null
    const response = await this.api.post<TripDto, TripResource>('/trips', tripDto)
    if (response instanceof HttpErrorResponse) return
    this.snackbar.success(await this.translate.get('myTrips.messages.tripCreated').toPromise())
    await this.fetchTrips()
  }

  public async deleteTrip(id: string): Promise<void> {
    const response = await this.api.delete(`/trips/${id}`, {
      handleError: true,
      errorMessage: await this.translate.get('myTrips.messages.tripDeleteError').toPromise()
    })
    if (response instanceof HttpErrorResponse) return
    this.snackbar.success(await this.translate.get('myTrips.messages.tripDeleted').toPromise())
    await this.deleteCoverImageIfNeeded(id)
    await this.fetchTrips()
  }

  public getTripById(id: string): Trip {
    return this.state.trips.find(t => t.id === id)
  }

  public setFutureOnly(value: boolean): void {
    this.isFutureOnly = value
    this.setState({ filteredTrips: this.filterTrips(this.state.trips) })
  }

  public setFilter(searchTerm: string): void {
    this.currentFilter = searchTerm
    this.setState({ filteredTrips: this.filterTrips(this.state.trips) })
  }

  public setOrder(orderBy: TripsOrder): void {
    this.currentOrder = orderBy
    this.setState({ filteredTrips: this.filterTrips(this.state.trips) })
  }

  private filterTrips(initialTrips: Trip[]): Trip[] {
    let trips = [...initialTrips]
    if (this.isFutureOnly) {
      trips = getFutureTrips(trips)
    }
    if (this.currentFilter) {
      trips = applyFilter(trips, this.currentFilter)
    }
    if (this.currentOrder) {
      orderTrips(trips, this.currentOrder)
    }
    return trips
  }

  private resetFilters(): void {
    this.isFutureOnly = true
    this.currentFilter = null
    this.currentOrder = null
  }

  private async deleteCoverImageIfNeeded(id: string): Promise<void> {
    const trip = this.getTripById(id)
    if (!trip.coverImageUrl) return
    await this.fileService.deleteFile(trip.coverImageUrl)
  }
}
