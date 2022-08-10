import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from './user.model';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async findUserByName(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username }).exec();
  }

  async saveUser(user: UserDocument): Promise<UserDocument> {
    return await user.save();
  }

  createNewUserDocument(username: string, password: string, salt: string): UserDocument {
    return new this.userModel({
      username,
      password,
      salt,
    });
  }
}
