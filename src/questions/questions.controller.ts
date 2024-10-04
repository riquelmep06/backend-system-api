import { Get, Post ,Controller, Body, Patch, Param, ParseIntPipe , Delete} from "@nestjs/common";
import { Questions } from "./interface/questions.interface";
import { QuestionsServices } from "./questions.service";
import { title } from "process";
import { CreateQuestionsDto } from "./dto/create-questions.dto";
import { UpdateQuestionsDto } from "./dto/update-questions.dto";

@Controller('questions/')
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
    @Body() updateQuestionsDto: UpdateQuestionsDto): Promise<Questions> {
    return await this.questionsServices.updateQuestions(id, updateQuestionsDto);
}

  @Delete('delete-question/:id') 
  async deleteQuestions(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Questions> {
    return await this.questionsServices.deleteQuestions(id);
}


 

}