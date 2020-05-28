import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/shurvey'),
    UserModule,
    AuthModule,
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
