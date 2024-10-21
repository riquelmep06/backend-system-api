import { Get, Post ,Controller, Body, Patch, Param, ParseIntPipe , Delete, UseGuards} from "@nestjs/common";
import { User } from "./interface/user.interface";
import { UsersServices } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "@nestjs/common";

@Controller('users/')
@UseGuards(AuthGuard('jwt'))
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

  @Patch('update-user/:id') 
  async updateUser(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto,
    @Request( ) req,
  ): Promise<User> {
    return await this.usersServices.updateUser(id, updateUserDto, req.user.id);
}

  @Delete('delete-user/:id') 
  async deleteUser(
    @Param('id', ParseIntPipe) id: number, @Request() req
  ): Promise<{message:string}> {
    return await this.usersServices.deleteUser(id, req.user.id);
}
}

