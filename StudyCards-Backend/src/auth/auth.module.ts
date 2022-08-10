import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { UserSchema } from './user.model';
import { JwtStrategy } from './jwt.strategy';
import { MyLoggerModule } from 'src/shared/my-logger.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SC_JWT_SECRET,
      signOptions: {
        expiresIn: 3600 * 24 * 30, // 30 days
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MyLoggerModule,
  ],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule, AuthService, AuthRepository, MongooseModule],
  controllers: [AuthController],
})
export class AuthModule {}
