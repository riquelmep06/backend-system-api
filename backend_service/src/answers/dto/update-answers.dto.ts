import { IsNumber, IsString, IsNotEmpty, IsOptional, Length } from "class-validator";

export class UpdateAnswersDto {

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id_questions: number;

    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    @IsOptional()
    description: string;
   

}