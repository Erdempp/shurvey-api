import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { Question, QuestionSchema } from './schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Survey.name, schema: SurveySchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
