import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDocument } from './users.model';
import { SignupResponse, LoginResponse, JwtDecodedToken, UserResponse, TokenResponse } from './users.types';
import {
  AuthCredentialsDto,
  UserSignupDto,
  UpdateUserDataDto,
  ChangePasswordDto,
  PasswordResetRequestDto,
  PasswordResetDto,
} from './users.dto';
import { CustomApiError } from 'src/shared/custom-errors';
import { UsersRepository } from './users.repository';
import { EmailService } from 'src/shared/email.service';
import { TripsRepository } from 'src/trips/trips.repository';
import { TpLogger } from 'src/shared/tp-logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tripsRepository: TripsRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly logger: TpLogger,
  ) {
    this.logger.setContext('UsersService');
  }

  async signUp(userSignupDto: UserSignupDto): Promise<SignupResponse> {
    const user = await this.createInitialUserDocument(userSignupDto);

    const exists = await this.usersRepository.findUserByEmail(userSignupDto.email);
    if (exists) {
      throw new ConflictException(CustomApiError.EMAIL_REGISTERED);
    }

    const result = await this.usersRepository.saveUser(user);

    this.logger.log(`User signed up: ${result.email} (id: ${result.id})`);

    return { id: result.id };
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<LoginResponse> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findUserByEmail(email);
    const validated = !!user ? await this.validatePassword(password, user.salt, user.password) : false;

    if (!user || !validated) {
      throw new UnauthorizedException(CustomApiError.INVALID_CREDENTIALS);
    }

    const accessToken = await this.jwtService.sign({ email });
    const expiresAt = (this.jwtService.decode(accessToken) as JwtDecodedToken).exp * 1000;
    const numberOfTrips = await this.tripsRepository.countTripsOfUser(user.id);

    this.logger.log(`User logged in: ${user.email} (id: ${user.id})`);

    return {
      token: accessToken,
      expiresAt,
      id: user.id,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      memberSince: user.memberSince,
      preferredDateFormat: user.preferredDateFormat,
      numberOfTrips,
    };
  }

  async refreshToken(userId: string): Promise<TokenResponse> {
    const user = await this.usersRepository.findUserById(userId);
    const token = await this.jwtService.sign({ email: user.email });
    const expiresAt = (this.jwtService.decode(token) as JwtDecodedToken).exp * 1000;
    return {
      token,
      expiresAt,
    };
  }

  async getUserData(userId: string): Promise<UserResponse> {
    const user = await this.usersRepository.findUserById(userId);
    const numberOfTrips = await this.tripsRepository.countTripsOfUser(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      id: user.id,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      memberSince: user.memberSince,
      preferredDateFormat: user.preferredDateFormat,
      numberOfTrips,
    };
  }

  async updateUserData(userId: string, userData: UpdateUserDataDto): Promise<UserResponse> {
    const { displayName, photoUrl, preferredDateFormat } = userData;
    const user = await this.usersRepository.updateUser(userId, displayName, photoUrl, preferredDateFormat);
    const numberOfTrips = await this.tripsRepository.countTripsOfUser(user.id);
    this.logger.log(`User updated (id: ${userId})`);
    return {
      id: user.id,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      memberSince: user.memberSince,
      preferredDateFormat: user.preferredDateFormat,
      numberOfTrips,
    };
  }

  async changePassword(userId: string, data: ChangePasswordDto): Promise<void> {
    const { newPassword } = data;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(newPassword, salt);
    await this.usersRepository.updatePassword(userId, hashedPassword, salt);
    this.logger.log(`User changed password (id: ${userId})`);
  }

  async sendPasswordResetEmail(data: PasswordResetRequestDto): Promise<void> {
    const { email } = data;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    const resetToken = this.jwtService.sign({ email });
    const emailStatus = await this.emailService.sendPasswordResetEmail(user.displayName, email, resetToken);
    this.logger.log(`User requested password reset email: ${email} (id: ${user.id})`);
    return emailStatus;
  }

  async resetPassword(data: PasswordResetDto): Promise<void> {
    const { email, resetToken, newPassword } = data;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    try {
      const verified = this.jwtService.verify(resetToken);
      if (!verified || new Date(verified.exp * 1000) < new Date()) {
        throw new ForbiddenException();
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await this.hashPassword(newPassword, salt);
      await this.usersRepository.updatePassword(user.id, hashedPassword, salt);
      this.logger.log(`User reset password successfully: ${email} (id: ${user.id})`);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async deleteUser(userId: string): Promise<void> {
    await Promise.all([this.usersRepository.deleteUser(userId), this.tripsRepository.deleteAllTripsForUser(userId)]);
    this.logger.log(`User account deleted (id: ${userId})`);
  }

  private async createInitialUserDocument(userSignupDto: UserSignupDto): Promise<UserDocument> {
    const { email, password, displayName } = userSignupDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, salt);
    return this.usersRepository.createNewUserDocument(email, hashedPassword, salt, displayName);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async validatePassword(password: string, salt: string, hashedPassword: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === hashedPassword;
  }
}
