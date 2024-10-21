import { IsString, IsNotEmpty, Length, IsEmail, IsEnum, IsOptional } from "class-validator";
import { Role } from "@prisma/client";
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

    @IsEnum(Role)
    @IsOptional()
    role: Role;


}
