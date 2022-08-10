import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupResponse, LoginResponse } from './auth.types';
import { AuthCredentialsDto } from './auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiCreatedResponse({ type: SignupResponse, description: 'User is created' })
  @ApiConflictResponse({ description: 'Name is already registered' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  signUp(@Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<SignupResponse> {
    return this.authService.signUp(credentials);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Log a user in' })
  @ApiOkResponse({ type: LoginResponse, description: 'Logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<LoginResponse> {
    return this.authService.signIn(authCredentialsDto);
  }
}
