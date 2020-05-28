import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { Question } from './schemas/question.schema';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name)
    private readonly survey: ReturnModelType<typeof Survey>,
    @InjectModel(Question.name)
    private readonly question: ReturnModelType<typeof Question>,
  ) {}

  async create(survey: Omit<Survey, '_id' | 'id'>) {
    const createdSurvey = await this.survey.create(survey);
    return createdSurvey ? createdSurvey.toObject() : undefined;
  }

  async getAll() {
    const surveys = await this.survey.find();
    return surveys ? surveys.map(s => s.toObject()) : undefined;
  }

  async getById(id: Survey['id']) {
    const survey = await this.survey.findById(id);
    return survey ? survey.toObject() : undefined;
  }

  async removeById(id: Survey['id']) {
    return this.survey.findByIdAndRemove(id);
  }

  async addQuestion(id: Survey['id'], question: Question) {
    const survey = await this.getById(id);
    if (!survey) {
      throw new NotFoundException();
    }
    question.survey = survey._id;

    const createdQuestion = await this.question.create(question);
    return createdQuestion ? createdQuestion.toObject() : undefined;
  }

  async getQuestionById(id: Question['id']) {
    const question = await this.question.findById(id);
    return question ? question.toObject() : undefined;
  }

  async addAnswer(id: Question['id'], answer: string) {
    const question = await this.getQuestionById(id);
    if (!question) {
      throw new NotFoundException();
    }

    question.answers.push(answer);
    const updatedQuestion = await this.question.findByIdAndUpdate(
      id,
      question,
      { new: true },
    );
    return updatedQuestion ? updatedQuestion.toObject() : undefined;
  }
}
