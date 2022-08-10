import { Schema, Document } from 'mongoose';

export const DeckSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export interface DeckDocument extends Document {
  _id: string;
  name: string;
  link: string;
  progress: string;
  userId: string;
}
