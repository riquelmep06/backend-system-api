import { IsNumber, IsString, IsNotEmpty, Length} from "class-validator";

export class CreateAnswersDto {

    @IsNumber()
    @IsNotEmpty()
    id_questions: number;

    @IsNumber()
    @IsNotEmpty()
    id_users: number;



    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    description: string;
   

}