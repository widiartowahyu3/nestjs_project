// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserProfile } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateProfile(
    userId: string,
    profileData: UserProfile,
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: { profile: profileData } },
        { new: true },
      )
      .exec();
  }

  async addInterests(
    userId: string,
    interests: string[],
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { interests: { $each: interests } } },
        { new: true },
      )
      .exec();
  }

  async deleteInterests(
    userId: string,
    interests: string[],
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { interests: { $in: interests } } },
        { new: true },
      )
      .exec();
  }
}
