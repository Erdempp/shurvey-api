import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { CurrentUser } from '../user/user.decorator';
import { User } from '../user/schemas/user.schema';
import { Survey } from './schemas/survey.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './schemas/question.schema';
import { CreateAnswerDto } from './dto/create-answer.dto';

@UseGuards(AuthGuard())
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() dto: CreateSurveyDto, @CurrentUser() currentUser: User) {
    return this.surveyService.create({ ...dto, creator: currentUser });
  }

  @Get()
  async getAll() {
    return this.surveyService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: Survey['id']) {
    return this.surveyService.getById(id);
  }

  @Delete(':id')
  async removeById(@Param('id') id: Survey['id']) {
    return this.surveyService.removeById(id);
  }

  @Put(':id/questions')
  async addQuestion(
    @Body() dto: CreateQuestionDto,
    @Param('id') id: Question['id'],
  ) {
    return this.surveyService.addQuestion(
      id,
      new Question({ question: dto.question, openQuestion: dto.openQuestion }),
    );
  }

  @Put('questions/:qId/answers')
  async addAnswer(
    @Body() { answer }: CreateAnswerDto,
    @Param('qId') id: string,
  ) {
    return this.surveyService.addAnswer(id, answer);
  }
}
