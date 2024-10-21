import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AnswersController } from './answers.controller';
import { AnswersServices } from './answers.service'; 


@Module({
  imports: [],
  controllers: [AnswersController],
  providers: [AnswersServices,PrismaService],
})
export class AnswersModule {}
