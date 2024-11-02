import { IsNumber, IsString, IsNotEmpty, IsDate, Length } from "class-validator";
import { Type } from 'class-transformer';

export class CreateQuestionsDto {

    @IsNumber()
    @IsNotEmpty()
    id_category: number;

    @IsString()
    @IsNotEmpty()
    @Length(5,45)
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(5,255)
    description: string;

    @IsString()
    @IsNotEmpty()
    @Length(5,45)
    status: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    create_date: string;
   

}    