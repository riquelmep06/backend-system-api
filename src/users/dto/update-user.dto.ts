import { IsString, IsNotEmpty, Length, IsEmail, IsOptional, IsEnum} from "class-validator";
import { Role } from "@prisma/client";
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

    @IsEnum(Role)
    @IsOptional()
    role: Role;

}
