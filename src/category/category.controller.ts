import { Get, Post ,Controller, Body, Patch, Param, ParseIntPipe , Delete, UseGuards} from "@nestjs/common";
import { Category } from "./interface/category.interface";
import { CategoryServices } from "./category.service";
import { CreateupdateCategoryDto } from "./dto/create-update-category.dto";
import { AuthGuard } from "@nestjs/passport";


@Controller('category/')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly CategoryServices: CategoryServices) {}

  @Get()
  async getCategory(): Promise<Category[]> {
    return await this.CategoryServices.getCategory();
   }
   
   @Post('create-category')
   async createCategory(@Body() CreateupdateCategoryDto: CreateupdateCategoryDto): Promise<Category> {
     return await this.CategoryServices.createCategory(CreateupdateCategoryDto);
    }

    @Patch('update-category/:id')
    async updateCategory(
      @Param('id', ParseIntPipe) id: number, 
      @Body() CreateupdateCategoryDto: CreateupdateCategoryDto): Promise<Category> {
      return await this.CategoryServices.updateCategory(id, CreateupdateCategoryDto);
  }

    @Delete('delete-category/:id')
    async deleteCategory(
      @Param('id', ParseIntPipe) id: number
  ): Promise<{message:string}> {
    return await this.CategoryServices.deleteCategory(id);
}



}

