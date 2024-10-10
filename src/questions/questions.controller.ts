import { Get, Post ,Controller, Body, Patch, Param, ParseIntPipe , Delete, UseGuards} from "@nestjs/common";
import { Questions } from "./interface/questions.interface";
import { QuestionsServices } from "./questions.service";
import { title } from "process";
import { CreateQuestionsDto } from "./dto/create-questions.dto";
import { UpdateQuestionsDto } from "./dto/update-questions.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "@nestjs/common";

@Controller('questions/')
@UseGuards(AuthGuard('jwt'))
export class QuestionsController {
  constructor(private readonly questionsServices: QuestionsServices) {}

  @Get()
  async getQuestions(): Promise<Questions[]> {
    return await this.questionsServices.getQuestions();
  }

  
  @Post('create-question')
  async createQuestions(@Body() createQuestionsDto: CreateQuestionsDto): Promise<Questions> {
    return await this.questionsServices.createQuestions(createQuestionsDto);

    

  }

  @Patch('update-question/:id') 
  async updateQuestions(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateQuestionsDto: UpdateQuestionsDto,
    @Request() req,
  ): Promise<Questions> {
    return await this.questionsServices.updateQuestions(id, updateQuestionsDto, req.user.id);
}

  @Delete('delete-question/:id') 
  async deleteQuestions(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{message:string}> {
    return await this.questionsServices.deleteQuestions(id, req.user.id);
}


 

}