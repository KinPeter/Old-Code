import { Trip, TripHeader, TripResponse } from '~/app/types/trip.types';

export class TripUtils {
  public static now = new Date();
  public static tomorrow = new Date(
    TripUtils.now.getFullYear(),
    TripUtils.now.getMonth(),
    TripUtils.now.getDate() + 1,
  );

  public static getHeadersFromTrip(trip: Trip): TripHeader {
    return {
      title: trip.title,
      startingDate: trip.startingDate,
      endingDate: trip.endingDate,
      countries: trip.countries,
    };
  }

  public static parseTripResponse(res: TripResponse): Trip {
    return {
      id: res.id,
      title: res.title,
      startingDate: res.startingDate,
      endingDate: res.endingDate,
      countries: res.countries,
      days: JSON.parse(res.json).days,
    };
  }

  public static getInitialTrip(): Trip {
    return {
      title: 'New trip',
      startingDate: this.tomorrow,
      endingDate: this.tomorrow,
      countries: [],
      days: [],
    };
  }
}
