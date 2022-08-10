import { PlaceOfService, PetType } from './search-data';
import { Day } from './user';

export interface SearchedSitter {
    id: number;
    userName: string;
    profilePhoto: null;
    city: string;
    address: string;
    postalCode: string;
    intro: string;
    services: {
      place: PlaceOfService;
      petType: PetType;
      pricePerHour: number;
      pricePerDay: number;
    };
    availabilities: Day[];
    averageRating?: number;
    numberOfRatings?: number;
}
