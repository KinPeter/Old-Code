import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from './users.model';
import { DateFormat } from 'src/shared/date-formats';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findUserById(userId: string): Promise<UserDocument> {
    return await this.userModel.findById(userId).exec();
  }

  async saveUser(user: UserDocument): Promise<UserDocument> {
    return await user.save();
  }

  createNewUserDocument(email: string, password: string, salt: string, displayName: string): UserDocument {
    return new this.userModel({
      email,
      password,
      salt,
      memberSince: new Date(),
      displayName,
      photoUrl: null,
      preferredDateFormat: DateFormat.DMY_LONG,
    });
  }

  async updateUser(
    id: string,
    displayName: string,
    photoUrl: string,
    preferredDateFormat: DateFormat,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, {
        displayName,
        photoUrl,
        preferredDateFormat,
      })
      .exec();
    const updatedUser = await this.userModel.findById(id).exec();
    if (!user || !updatedUser) {
      throw new NotFoundException();
    }
    return updatedUser;
  }

  async updatePassword(id: string, password: string, salt: string): Promise<void> {
    const user = await this.userModel
      .findByIdAndUpdate(id, {
        password,
        salt,
      })
      .exec();
    if (!user) {
      throw new NotFoundException();
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
  }
}
