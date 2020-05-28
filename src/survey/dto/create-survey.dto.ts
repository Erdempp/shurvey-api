import { IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {
    @IsNotEmpty()
    title: string;
}