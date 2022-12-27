/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET_KEY } from '../config/constants';
import { JwtStrategy, Localstrategy } from './strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET_KEY),
        signOptions:{ expiresIn: '1d' }
      })
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    Localstrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
