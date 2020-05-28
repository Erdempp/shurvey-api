import * as mongoose from 'mongoose';
import { prop, buildSchema, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from '../../user/schemas/user.schema';
import { Expose, Exclude } from 'class-transformer';

export class Survey {
  constructor(props: Partial<Survey>) {
    Object.assign(this, props);
  }

  @Expose()
  get id() {
    return this._id.toHexString();
  }

  @Exclude()
  _id: mongoose.Types.ObjectId;

  @prop({ required: true })
  title: string;

  @prop({ ref: User.name, required: true })
  creator: Ref<User>;
}

export const SurveyModel = getModelForClass(Survey);
export const SurveySchema = buildSchema(Survey, {
  toJSON: { versionKey: false },
  toObject: {
    versionKey: false,
  },
});
