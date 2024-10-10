import { PrismaService } from "src/database/prisma.service";
import { Category } from "./interface/category.interface";
import { Injectable, ParseIntPipe } from "@nestjs/common";
import { CreateupdateCategoryDto } from "./dto/create-update-category.dto";


@Injectable()
export class CategoryServices {
  constructor(private prisma: PrismaService) {}

  async getCategory(): Promise<Category[]> {
    return await this.prisma.category.findMany()
  }
  
  async createCategory(createupdateCategoryDto: CreateupdateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({
      data: {
        name: createupdateCategoryDto.name,
      },
    });
  }

  async updateCategory(id:number, createupdateCategoryDto: CreateupdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({
      where: { id:id }, 
      data: createupdateCategoryDto, 
    });
  }

  async deleteCategory(id: number): Promise<{message:string}> {
    await this.prisma.category.delete({
      where: { id: id },
    });
    return {message: "Categoria deletada!"}
  }

}
