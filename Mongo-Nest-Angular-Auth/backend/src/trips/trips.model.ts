import { Schema, Document } from 'mongoose';

export const TripSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  coverImageUrl: {
    type: String,
    required: false,
  },
  countries: {
    type: [String],
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
});

export interface TripDocument extends Document {
  _id: string;
  userId: string;
  title: string;
  startingDate: Date;
  endingDate: Date;
  coverImageUrl: string;
  countries: string[];
  days: string;
}
