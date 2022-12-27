/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare }  from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}
  
  validateUser = async (email: string, password: string) =>{
    
      const user = await this.userService.findOneByEmail(email, true);
   
      if(user && await compare(password, user.password)){
        const { password, ...result } = user;
        return result;
      }else{
        return null;
      }
    
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
