import { PrismaService } from "src/database/prisma.service";
import { Questions } from "./interface/questions.interface";
import { HttpStatus, Injectable, ParseIntPipe } from "@nestjs/common";
import { CreateQuestionsDto } from "./dto/create-questions.dto";
import { UpdateQuestionsDto } from "./dto/update-questions.dto";
import { HttpException } from "@nestjs/common";

@Injectable()
export class QuestionsServices {
  constructor(private prisma: PrismaService) {}

  async getQuestions(): Promise<Questions[]> {
    return await this.prisma.questions.findMany()
  }
  
  async createQuestions(CreateQuestionsDto: CreateQuestionsDto, user_id_request: number): Promise<Questions> {
    return await this.prisma.questions.create({
      data: {
        id_users: user_id_request,
        id_category: CreateQuestionsDto.id_category,
        description: CreateQuestionsDto.description,
        title: CreateQuestionsDto.title,
        create_date: CreateQuestionsDto.create_date,
        status: CreateQuestionsDto.status
       
      },
    });
  }

  
  async updateQuestions(id:number, updateQuestionsDto: UpdateQuestionsDto, user_id_request: number): Promise<Questions> {
    if (id !== user_id_request){
      throw new HttpException(
        'Você não tem acesso, pois essa pergunta nao é sua.',
        HttpStatus.UNAUTHORIZED,

      )}
    return await this.prisma.questions.update({
      where: { id }, 
      data: updateQuestionsDto, 
    });
  }

  async deleteQuestions(id: number, user_id_request: number): Promise<{message:string}> {
    if (id !== user_id_request){
      throw new HttpException(
        'Você não tem acesso, pois essa pergunta nao é sua.',
        HttpStatus.UNAUTHORIZED,

      )}
    await this.prisma.questions.delete({
      where: { id },
    });
    return {message: "Pergunta deletada!"}
  }

 
}