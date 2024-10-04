import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryServices } from './category.service'; 


@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryServices,PrismaService],
})
export class CategoryModule {}
