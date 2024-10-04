import { IsString, IsNotEmpty, Length, IsEmail, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(5, 100)
    @IsOptional()
    name: string;


    @IsEmail()
    @IsNotEmpty()
    @Length(5, 100)
    @IsOptional()
    email: string;


    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    @IsOptional()
    password: string;
}
