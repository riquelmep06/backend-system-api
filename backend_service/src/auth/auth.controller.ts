import { Controller, Post, UseGuards , Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginAuth(@Req()req:any){
    return await this.authService.login(req.user);
  }
 
  @Post('register')
  async registerAuth(@Body()CreateUserDto: CreateUserDto){
    return await this.authService.register(CreateUserDto)
  }

  @Post('refresh')
  async refresh(@Body('refresh_token')refreshToken:string){
    return await this.authService.refreshToken(refreshToken)
  }

}