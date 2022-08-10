import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDocument } from './user.model';
import { SignupResponse, LoginResponse, JwtDecodedToken } from './auth.types';
import { AuthCredentialsDto } from './auth.dto';
import { AuthRepository } from './auth.repository';
import { MyLogger } from 'src/shared/my-logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly logger: MyLogger,
  ) {
    this.logger.setContext('AuthService');
  }

  async signUp(credentials: AuthCredentialsDto): Promise<SignupResponse> {
    const user = await this.createInitialUserDocument(credentials);

    const exists = await this.authRepository.findUserByName(credentials.username);
    if (exists) {
      throw new ConflictException('NAME_REGISTERED');
    }

    const result = await this.authRepository.saveUser(user);

    this.logger.log(`User signed up: ${result.username} (id: ${result.id})`);

    return { id: result.id };
  }

  async signIn(credentials: AuthCredentialsDto): Promise<LoginResponse> {
    const { username, password } = credentials;
    const user = await this.authRepository.findUserByName(username);
    const validated = !!user ? await AuthService.validatePassword(password, user.salt, user.password) : false;

    if (!user || !validated) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    const accessToken = await this.jwtService.sign({ username });
    const expiresAt = (this.jwtService.decode(accessToken) as JwtDecodedToken).exp * 1000;

    this.logger.log(`User logged in: ${user.username} (id: ${user.id})`);

    return {
      token: accessToken,
      expiresAt,
      id: user.id,
      username: user.username,
    };
  }

  private async createInitialUserDocument(credentials: AuthCredentialsDto): Promise<UserDocument> {
    const { username, password } = credentials;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await AuthService.hashPassword(password, salt);
    return this.authRepository.createNewUserDocument(username, hashedPassword, salt);
  }

  private static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private static async validatePassword(
    password: string,
    salt: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === hashedPassword;
  }
}
