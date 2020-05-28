import * as mongoose from 'mongoose';
import { prop, buildSchema, getModelForClass, Ref } from '@typegoose/typegoose';
import { Expose, Exclude, Transform } from 'class-transformer';
import { Survey } from './survey.schema';

export class Question {
  constructor(props: Partial<Question>) {
    Object.assign(this, props);
  }

  @Expose()
  get id() {
    return this._id.toHexString();
  }

  @Exclude()
  _id: mongoose.Types.ObjectId;

  @prop({ ref: Survey.name, required: true })
  survey: Ref<Survey>;

  @prop({ required: true })
  question: string;

  @prop({ required: true, default: false })
  openQuestion: boolean;

  @prop({ default: [] })
  answers?: string[];
}

export const QuestionModel = getModelForClass(Question);
export const QuestionSchema = buildSchema(Question, {
  toJSON: { versionKey: false },
  toObject: {
    versionKey: false,
  },
});
