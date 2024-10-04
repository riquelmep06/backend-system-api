import { Get, Post ,Controller, Body, Patch, Param, ParseIntPipe , Delete} from "@nestjs/common";
import { User } from "./interface/user.interface";
import { UsersServices } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users/')
export class UsersController {
  constructor(private readonly usersServices: UsersServices) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersServices.getUser();
  }

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersServices.createUser(createUserDto);
  }

  @Patch('update-user:id') // PATCH /users/:id
  async updateUser(
    @Param('id', ParseIntPipe) id: number, // ID passado pela URL
    @Body() updateUserDto: UpdateUserDto // Dados de atualização passados no corpo
  ): Promise<User> {
    return await this.usersServices.updateUser(id, updateUserDto);
}

  @Delete('delete-user:id') // DELETE /users/:id
  async deleteUser(
    @Param('id', ParseIntPipe) id: number
  ): Promise<User> {
    return await this.usersServices.deleteUser(id);
}
}

