// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserProfile {
  displayName?: string;
  gender?: string;
  birthDay?: string;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  images: string[]; // Array of image URLs

  @Prop()
  about: string;

  @Prop({ type: [String] }) // Array of strings for interests
  interests: string[];

  @Prop()
  profile: UserProfile; // Include a profile field in the User schema
}

export const UserSchema = SchemaFactory.createForClass(User);
