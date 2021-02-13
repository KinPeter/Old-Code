import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '~/app/services/user-auth/user.service';
import { CreateTripRequest, Trip, TripHeaderResource, TripResponse } from '~/app/types/trip.types';
import { User } from '~/app/types/user.types';
import { ApiService } from '~/app/services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from '~/app/services/ui.service';
import { TripUtils } from '~/app/utils/trip.utils';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private _trip: BehaviorSubject<Trip> = new BehaviorSubject<Trip>(TripUtils.getInitialTrip());
  private _savedTrip: BehaviorSubject<Trip> = new BehaviorSubject<Trip>(TripUtils.getInitialTrip());
  private _hasChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: User;

  public trip: Observable<Trip> = this._trip.asObservable();
  public hasChanges: Observable<boolean> = this._hasChanges.asObservable();

  constructor(private api: ApiService, private userService: UserService, private ui: UiService) {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  public initNewTrip(): void {
    this._trip.next(TripUtils.getInitialTrip());
    this._savedTrip.next(TripUtils.getInitialTrip());
  }

  public async create(trip: CreateTripRequest): Promise<TripResponse> {
    const response = await this.api.post<CreateTripRequest, TripResponse>(
      `/trips/${this.user.id}/create`,
      trip,
    );
    if (response.id) {
      this.userService.increaseLocalNumberOfTrips();
    }
    return response;
  }

  public async update(trip: Trip): Promise<void> {
    const response = await this.api.patch<CreateTripRequest, unknown>(
      `/trips/${this.user.id}/update/${this._trip.value.id}`,
      {
        ...trip,
        json: JSON.stringify({ days: trip.days }),
      },
    );
    if (response instanceof HttpErrorResponse) return;
    this.ui.success('Changes saved.');
    this._trip.next(trip);
    this._savedTrip.next(JSON.parse(JSON.stringify(trip)));
    this._hasChanges.next(false);
  }

  public async getTripHeaders(): Promise<TripHeaderResource[]> {
    return await this.api.get<TripHeaderResource[]>(`/trip-headers/${this.user.id}`);
  }

  public async fetch(tripId: string): Promise<void> {
    const response = await this.api.get<TripResponse>(`/trips/${this.user.id}/${tripId}`);
    if (response instanceof HttpErrorResponse) return;
    this._trip.next(TripUtils.parseTripResponse(response));
    this._savedTrip.next(TripUtils.parseTripResponse(response));
  }

  public async delete(tripId: string): Promise<void> {
    const response = await this.api.delete(`/trips/${this.user.id}/delete/${tripId}`);
    if (response instanceof HttpErrorResponse) return;
    this.userService.decreaseLocalNumberOfTrips();
  }

  public checkForChanges(): void {
    const currentSerialized = JSON.stringify(this._trip.value);
    const savedSerialized = JSON.stringify(this._savedTrip.value);
    this._hasChanges.next(currentSerialized !== savedSerialized);
  }
}
