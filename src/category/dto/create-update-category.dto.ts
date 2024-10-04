import { IsString, IsNotEmpty, Length} from "class-validator";
export class CreateupdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Length(5, 45)
    name: string;
   
}

