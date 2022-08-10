import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  username: {
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
});

export interface UserDocument extends Document {
  _id: string;
  username: string;
  password: string;
  salt: string;
}
