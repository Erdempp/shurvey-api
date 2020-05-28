import { IsNotEmpty, IsMongoId, IsBoolean } from 'class-validator';
import { Survey } from '../schemas/survey.schema';

export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsBoolean()
  openQuestion: boolean;
}
