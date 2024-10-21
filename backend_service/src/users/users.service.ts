import { PrismaService } from "src/database/prisma.service";
import { User } from "./interface/user.interface";
import { HttpException, HttpStatus, Injectable, ParseIntPipe, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersServices {
  constructor(private prisma: PrismaService) {}

  async getUser(): Promise<User[]> {
    return await this.prisma.users.findMany({
      select:{
        id: true,
        name: true,
        email:true,
        roles: true,
      }
    })
  }


  async createUser(createUserDto: CreateUserDto): Promise<User> {

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    return await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        roles: createUserDto.role
      },
    });
  }

  async updateUser(id:number, updateUserDto: UpdateUserDto, user_id_request: number): Promise<User> {
    if (id !== user_id_request){
      throw new HttpException(
        'Você não tem acesso, pois nao é esse usuário.',
        HttpStatus.UNAUTHORIZED,

      )
    }

    let password = updateUserDto.password
    if(password){
      const saltRounds = 10; 
      password = await bcrypt.hash(password, saltRounds);

    }


    return this.prisma.users.update({
      where: { id }, 
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: password || updateUserDto.password,
        roles:updateUserDto.role
      }, 
    });
  }
  async deleteUser(id: number, user_id_request: number): Promise<{message: string}> {
    if (id !== user_id_request){
      throw new HttpException(
        'Você não tem acesso, pois nao é esse usuário.',
        HttpStatus.UNAUTHORIZED,

      )}
    await this.prisma.users.delete({
      where: { id },
    });
    return {message: "Usuário deletado!"}
  }
  
  async findByEmail(email: string) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!existingUser){
      throw new UnauthorizedException("Senha ou Email inválido")
    }
    return await this.prisma.users.findUnique({
      where: {email},
    })
  }
}




