import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './auth.types';
import { AuthRepository } from './auth.repository';
import { UserDocument } from './user.model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SC_JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDocument> {
    const { username } = payload;
    const user = await this.usersRepository.findUserByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
