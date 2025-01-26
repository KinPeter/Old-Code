export class Trip implements TripBase {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public startingDate: Date,
    public endingDate: Date,
    public countries: string[],
    public coverImageUrl: string = null,
    public days: Day[]
  ) {}

  public static fromResource(res: TripResource): Trip {
    return new Trip(
      res.id,
      res.userId,
      res.title,
      new Date(res.startingDate),
      new Date(res.endingDate),
      res.countries,
      res.coverImageUrl || null,
      JSON.parse(res.days) as Day[]
    )
  }

  public toDto(): TripDto {
    return {
      ...this,
      days: JSON.stringify(this.days)
    }
  }
}

export interface TripBase {
  title: string
  startingDate: Date
  endingDate: Date
  countries: string[]
  coverImageUrl?: string
}

export interface TripDto extends TripBase {
  days: string
}

export interface TripResource extends TripBase {
  id: string
  userId: string
  days: string
}

export interface Day {
  date: Date
  cities: City[]
  transportation?: Transportation[]
  comments?: Comment[]
}

export interface Place {
  name: string
  location: Coords
  comments?: Comment[]
}

export interface City extends Place {
  places: Place[]
  accommodation?: Place
}

export interface Transportation {
  from: City | Place
  to: City | Place
  by: TransportationType
  comments?: Comment[]
}

export enum TransportationType {
  AIRPLANE = 'Airplane',
  TRAIN = 'Train',
  SHIP = 'Ship',
  BUS = 'Bus',
  CAR = 'Car',
  TAXI = 'Taxi'
}

export interface Comment {
  points?: string[]
  links?: Link[]
}

export interface Link {
  name: string
  url: string
}

export interface Coords {
  lat: number
  lon: number
}
