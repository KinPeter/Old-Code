import { Schema, Document } from 'mongoose';

import { DateFormat } from 'src/shared/date-formats';

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  memberSince: {
    type: Date,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
  },
  preferredDateFormat: {
    type: String,
    required: true,
  },
});

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
  salt: string;
  memberSince: Date;
  displayName: string;
  photoUrl: string;
  preferredDateFormat: DateFormat;
}
