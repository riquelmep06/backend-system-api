import { PrismaService } from "src/database/prisma.service";
import { Questions } from "./interface/questions.interface";
import { Injectable, ParseIntPipe } from "@nestjs/common";
import { CreateQuestionsDto } from "./dto/create-questions.dto";
import { UpdateQuestionsDto } from "./dto/update-questions.dto";


@Injectable()
export class QuestionsServices {
  constructor(private prisma: PrismaService) {}

  async getQuestions(): Promise<Questions[]> {
    return await this.prisma.questions.findMany()
  }
  
  async createQuestions(CreateQuestionsDto: CreateQuestionsDto): Promise<Questions> {
    return await this.prisma.questions.create({
      data: {
        id_users: CreateQuestionsDto.id_users,
        id_category: CreateQuestionsDto.id_category,
        description: CreateQuestionsDto.description,
        title: CreateQuestionsDto.title,
        create_date: CreateQuestionsDto.create_date,
        status: CreateQuestionsDto.status
       
      },
    });
  }

  
  async updateQuestions(id:number, updateQuestionsDto: UpdateQuestionsDto): Promise<Questions> {
    return await this.prisma.questions.update({
      where: { id }, 
      data: updateQuestionsDto, 
    });
  }

  async deleteQuestions(id: number): Promise<Questions> {
    return await this.prisma.questions.delete({
      where: { id },
    });
  }

 
}