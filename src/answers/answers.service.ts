import { PrismaService } from "src/database/prisma.service";
import { Answers } from "./interface/answers.interface";
import { Injectable, ParseIntPipe } from "@nestjs/common";
import { CreateAnswersDto } from "./dto/create-answers.dto";
import { UpdateAnswersDto } from "./dto/update-answers.dto";


@Injectable()
export class AnswersServices {
  constructor(private prisma: PrismaService) {}

  async getAnswers(): Promise<Answers[]> {
    return await this.prisma.answers.findMany()
  }
  
  async createAnswers(CreateAnswersDto: CreateAnswersDto): Promise<Answers> {
    return await this.prisma.answers.create({
      data: {
        id_users: CreateAnswersDto.id_users,
        id_questions: CreateAnswersDto.id_questions,
        description: CreateAnswersDto.description
      },
    });
  }

  
  async updateAnswers(id:number, updateAnswersDto: UpdateAnswersDto): Promise<Answers> {
    return await this.prisma.answers.update({
      where: { id }, 
      data:updateAnswersDto, 
    });
  }

  async deleteAnswers(id: number): Promise<Answers> {
    return await this.prisma.answers.delete({
      where: { id },
    });
  }

 
}