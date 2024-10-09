import { Get, Post ,Controller, Body, Patch, Param, ParseIntPipe , Delete, UseGuards} from "@nestjs/common";
import { Answers } from "./interface/answers.interface";
import { AnswersServices } from "./answers.service";
import { title } from "process";
import { CreateAnswersDto } from "./dto/create-answers.dto";
import { UpdateAnswersDto } from "./dto/update-answers.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('answers/')
@UseGuards(AuthGuard('jwt'))
export class AnswersController {
  constructor(private readonly answersServices: AnswersServices) {}

  @Get()
  async getAnswers(): Promise<Answers[]> {
    return await this.answersServices.getAnswers();
  }

  
  @Post('create-answer')
  async createAnswers(@Body() createAnswersDto: CreateAnswersDto): Promise<Answers> {
    return await this.answersServices.createAnswers(createAnswersDto);

  }

  @Patch('update-answer/:id') 
  async updateAnswers(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateAnswersDto: UpdateAnswersDto
  ): Promise<Answers> {
    return await this.answersServices.updateAnswers(id, updateAnswersDto);
}

  @Delete('delete-answer/:id') 
  async deleteAnswers(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Answers> {
    return await this.answersServices.deleteAnswers(id);
}


 

}