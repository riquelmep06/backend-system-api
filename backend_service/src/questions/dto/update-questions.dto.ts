import { IsNumber, IsString, IsNotEmpty, IsDate, IsOptional, Length } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateQuestionsDto {

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id_category: number;

    @IsString()
    @IsNotEmpty()
    @Length(5, 45)
    @IsOptional()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 45)
    @IsOptional()
    status: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    @IsOptional()
    create_date: string;
   

}    