import * as mongoose from 'mongoose';
import { prop, buildSchema, getModelForClass } from '@typegoose/typegoose';
import { Expose, Exclude } from 'class-transformer';

export class User {
  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }

  @Expose()
  get id() {
    return this._id.toHexString();
  }

  @Exclude()
  _id: mongoose.Types.ObjectId;

  @prop({ required: true, unique: true, index: true })
  email: string;

  @prop({ required: true })
  displayName: string;

  @prop({ required: true })
  @Exclude()
  password: string;

  @prop({ default: 0 })
  score?: number;
}

export const UserModel = getModelForClass(User);
export const UserSchema = buildSchema(User, {
  toJSON: { versionKey: false },
  toObject: {
    versionKey: false,
  },
});
