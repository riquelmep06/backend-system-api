import { PrismaService } from "src/database/prisma.service";
import { Answers } from "./interface/answers.interface";
import { HttpException, HttpStatus, Injectable, ParseIntPipe } from "@nestjs/common";
import { CreateAnswersDto } from "./dto/create-answers.dto";
import { UpdateAnswersDto } from "./dto/update-answers.dto";


@Injectable()
export class AnswersServices {
  constructor(private prisma: PrismaService) {}

  async getAnswers(): Promise<Answers[]> {
    return await this.prisma.answers.findMany()
  }
  
  async createAnswers(CreateAnswersDto: CreateAnswersDto,user_id_request: number): Promise<Answers> {
    return await this.prisma.answers.create({
      data: {
        id_users: user_id_request,
        id_questions: CreateAnswersDto.id_questions,
        description: CreateAnswersDto.description
      },
    });
  }

  
  async updateAnswers(id:number, updateAnswersDto: UpdateAnswersDto, user_id_request: number): Promise<Answers> {
    if (id !== user_id_request){
      throw new HttpException(
        'Você não tem acesso, pois essa resposta nao é sua.',
        HttpStatus.UNAUTHORIZED,

      )}
    return await this.prisma.answers.update({
      where: { id }, 
      data:updateAnswersDto, 
    });
  }

  async deleteAnswers(id: number, user_id_request: number): Promise<{message:string}> {
    if (id !== user_id_request){
      throw new HttpException(
        'Você não tem acesso, pois essa resposta nao é sua.',
        HttpStatus.UNAUTHORIZED,

      )}
    await this.prisma.answers.delete({
      where: { id },
    });
    return {message:"Resposta deletada!"}
  }

 
}