import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TripDocument } from './trips.model';
import { TripDto } from './trips.dto';

@Injectable()
export class TripsRepository {
  constructor(@InjectModel('Trip') private readonly tripModel: Model<TripDocument>) {}

  async getTrip(tripId: string): Promise<TripDocument> {
    const trip = await this.tripModel.findById(tripId).exec();
    if (!trip) {
      throw new NotFoundException();
    }
    return trip;
  }

  async getTripsOfUser(userId: string): Promise<TripDocument[]> {
    const trips = await this.tripModel.find({ userId }).exec();
    if (!trips || !trips.length) {
      throw new NotFoundException();
    }
    return trips;
  }

  async countTripsOfUser(userId: string): Promise<number> {
    return await this.tripModel.countDocuments({ userId }).exec();
  }

  async createTrip(userId: string, tripDto: TripDto): Promise<TripDocument> {
    const trip = new this.tripModel({ userId, ...tripDto });
    return await trip.save();
  }

  async updateTrip(tripId: string, userId: string, tripDto: TripDto): Promise<TripDocument> {
    const trip = await this.tripModel.findByIdAndUpdate(tripId, { userId, ...tripDto }).exec();
    const updatedTrip = await this.tripModel.findById(tripId).exec();
    if (!trip || !updatedTrip) {
      throw new NotFoundException();
    }
    return updatedTrip;
  }

  async deleteTrip(tripId: string): Promise<void> {
    const trip = await this.tripModel.findByIdAndDelete(tripId).exec();
    if (!trip) {
      throw new NotFoundException();
    }
  }

  async deleteAllTripsForUser(userId: string): Promise<void> {
    await this.tripModel.deleteMany({ userId }).exec();
  }
}
