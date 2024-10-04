import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { QuestionsController } from './questions.controller';
import { QuestionsServices } from './questions.service'; 


@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [QuestionsServices,PrismaService],
})
export class QuestionsModule {}
