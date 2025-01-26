import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UserSchema } from './users.model';
import { JwtStrategy } from './jwt.strategy';
import { EmailService } from 'src/shared/email.service';
import { TripsModule } from 'src/trips/trips.module';
import { TpLoggerModule } from 'src/shared/tp-logger.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TP_JWT_SECRET,
      signOptions: {
        expiresIn: 3600 * 6,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => TripsModule),
    TpLoggerModule,
  ],
  providers: [UsersService, UsersRepository, JwtStrategy, EmailService],
  exports: [JwtStrategy, PassportModule, UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
