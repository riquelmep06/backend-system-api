import { PrismaService } from "src/database/prisma.service";
import { User } from "./interface/user.interface";
import { Injectable, ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsersServices {
  constructor(private prisma: PrismaService) {}

  async getUser(): Promise<User[]> {
    return await this.prisma.users.findMany()
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password
      },
    });
  }

  async updateUser(id:number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.users.update({
      where: { id }, 
      data: updateUserDto, 
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.users.delete({
      where: { id },
    });
  }

}


