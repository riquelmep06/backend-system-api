import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from './users.controller';
import { UsersServices } from './users.service'; 


@Module({
  imports:[],
  controllers: [UsersController],
  providers: [UsersServices,PrismaService],
  exports: [UsersServices],
})
export class UsersModule {}
