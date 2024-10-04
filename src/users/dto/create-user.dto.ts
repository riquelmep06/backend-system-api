import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(5, 100)
    name: string;


    @IsEmail()
    @IsNotEmpty()
    @Length(5, 100)
    email: string;


    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    password: string;
}
