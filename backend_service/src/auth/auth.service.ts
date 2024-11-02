import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServices } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/interface/user.interface';

import { access } from 'fs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersServices: UsersServices,
        private readonly jwtService: JwtService,
      ) {}

      async login(user) {
        const payload = { email: user.email, sub: user.id };
       
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d', });
          
          return{
            access_token: accessToken,
            refreshToken: refreshToken,
          }
       
      }
      async register(createUserDto: CreateUserDto) {
        
        const user = await this.usersServices.createUser(createUserDto)
        const payload = { email: user.email, sub: user.id };
       
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d', });
          
          return{
            access_token: accessToken,
            refreshToken: refreshToken,
          }
       
      }

      async refreshToken(refresh_token:string){
        try{
          const payload = this.jwtService.verify(refresh_token)
          const newAccessToken = this.jwtService.sign({
            email: payload.email,
            sub: payload.id
          });
          return{
            access_token: newAccessToken
          };
        } catch{
          throw new UnauthorizedException("token de refresh inválido")
        }
      }

      async validateUser(email: string, password: string){
        let user: User;


        try{
          user = await this.usersServices.findByEmail(email)
        } catch{
            return null
        }

        const testPassword = compareSync(password, user.password);

        if(!testPassword) return null;

        return user;
        }
      }
   
     



