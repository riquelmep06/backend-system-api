import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';



@Module({
  imports: [UsersModule, CategoryModule, QuestionsModule, AnswersModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
