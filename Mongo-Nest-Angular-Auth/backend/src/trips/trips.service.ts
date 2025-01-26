import { ForbiddenException, Injectable } from '@nestjs/common';

import { TripsRepository } from './trips.repository';
import { Trip } from './trips.types';
import { TripDto } from './trips.dto';
import { TpLogger } from 'src/shared/tp-logger.service';
import { UserDocument } from 'src/users/users.model';
import { TripDocument } from './trips.model';

@Injectable()
export class TripsService {
  constructor(private readonly tripsRepository: TripsRepository, private readonly logger: TpLogger) {
    this.logger.setContext('TripsService');
  }

  async getTrip(user: UserDocument, tripId: string): Promise<Trip> {
    const trip = await this.tripsRepository.getTrip(tripId);
    if (trip.userId !== user.id) {
      throw new ForbiddenException();
    }
    this.logger.log(`Trip with id: ${tripId} retrieved for user (id: ${trip.userId})`);
    return Trip.fromDocument(trip);
  }

  async getTripsOfUser(user: UserDocument, userId: string): Promise<Trip[]> {
    const documents = await this.tripsRepository.getTripsOfUser(userId);
    if (documents[0].userId !== user.id) {
      throw new ForbiddenException();
    }
    this.logger.log(`Trips for user requested (id: ${userId}) - received ${documents.length} results`);
    return documents.map((doc: TripDocument) => Trip.fromDocument(doc));
  }

  async createTrip(user: UserDocument, tripDto: TripDto): Promise<Trip> {
    const trip = await this.tripsRepository.createTrip(user.id, tripDto);
    this.logger.log(`New Trip with id: ${trip.id} saved for user (id: ${user.id})`);
    return Trip.fromDocument(trip);
  }

  async updateTrip(user: UserDocument, tripId: string, tripDto: TripDto): Promise<Trip> {
    const origTrip = await this.tripsRepository.getTrip(tripId);
    if (origTrip.userId !== user.id) {
      throw new ForbiddenException();
    }
    const trip = await this.tripsRepository.updateTrip(tripId, user.id, tripDto);
    this.logger.log(`Trip with id: ${tripId} updated for user (id: ${user.id})`);
    return Trip.fromDocument(trip);
  }

  async deleteTrip(user: UserDocument, tripId: string): Promise<void> {
    const trip = await this.tripsRepository.getTrip(tripId);
    if (trip.userId !== user.id) {
      throw new ForbiddenException();
    }
    await this.tripsRepository.deleteTrip(tripId);
    this.logger.log(`Trip with id: ${tripId} deleted`);
  }
}
