import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  displayName: string;

  @IsNotEmpty()
  @Length(3)
  password: string;
}
