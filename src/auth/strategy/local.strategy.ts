/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class Localstrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService
    ){
        super({
            usernameField: 'email' || 'username',
            passwordField: 'password'
        });
    }

    validate = async (email: string, password: string) => {

        const user = await this.authService.validateUser(email,password);
    
        if(!user){
            throw new UnauthorizedException("Credenciales proporcionadas incorrectas.")
        }

        return user;
    }
}
