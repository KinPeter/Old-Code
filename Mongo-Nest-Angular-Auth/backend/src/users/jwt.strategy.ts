import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './users.types';
import { UsersRepository } from './users.repository';
import { UserDocument } from './users.model';

require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TP_JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDocument> {
    const { email } = payload;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
