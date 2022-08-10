import {PlaceOfService} from './search-data';
import {PetType} from './search-data';

export interface Userreg {
    userId?: number;
    userName: string;
    email: string;
    password?: string;
    ownerData: Owner | null;
    sitterData: Sitter | null;
}

export interface OwnersPet {
    name: string;
    petType: PetType;
}

export interface Owner {
    pets: OwnersPet[];
}

export interface SitterService {
    place: PlaceOfService;
    petType: PetType;
    pricePerHour: number;
}

export interface Day {
    id: number;
    availability: string;
    date: string;
}

export interface Sitter {
    address: string;
    postalCode: string;
    city: string;
    intro: string;
    services: SitterService[];
    availabilities?: Day[];
}
