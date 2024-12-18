import { Get, Post ,Controller, Body, Patch, Param, ParseIntPipe , Delete, UseGuards} from "@nestjs/common";
import { User } from "./interface/user.interface";
import { UsersServices } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "@nestjs/common";

@Controller('users/')

export class UsersController {
  constructor(private readonly usersServices: UsersServices) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers(): Promise<User[]> {
    return await this.usersServices.getUser();
  }

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersServices.createUser(createUserDto);
  }

  @Patch('update-user/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto,
    @Request( ) req,
  ): Promise<User> {
    return await this.usersServices.updateUser(id, updateUserDto, req.user.sub);
}

  @Delete('delete-user/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(
    @Param('id', ParseIntPipe) id: number, @Request() req
  ): Promise<{message:string}> {
    return await this.usersServices.deleteUser(id, req.user.sub);
}
}

