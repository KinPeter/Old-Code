import { Controller, Post, Body, ValidationPipe, UseGuards, Param, HttpCode, Delete, Put, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserDocument } from './users.model';
import { SignupResponse, LoginResponse, UserResponse, TokenResponse } from './users.types';
import {
  AuthCredentialsDto,
  UserSignupDto,
  UpdateUserDataDto,
  ChangePasswordDto,
  PasswordResetRequestDto,
  PasswordResetDto,
} from './users.dto';
import { GetUserAndAuthorize } from 'src/shared/get-user-and-authorize.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a user' })
  @ApiCreatedResponse({ type: SignupResponse, description: 'User is created' })
  @ApiConflictResponse({ description: 'Email is already registered' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  signUp(@Body(ValidationPipe) userSignupDto: UserSignupDto): Promise<SignupResponse> {
    return this.usersService.signUp(userSignupDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Log a user in' })
  @ApiOkResponse({ type: LoginResponse, description: 'Logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<LoginResponse> {
    return this.usersService.signIn(authCredentialsDto);
  }

  @Get('/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get data of a user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponse, description: 'The user data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  getUserData(@GetUserAndAuthorize() user: UserDocument, @Param('userId') userId: string): Promise<UserResponse> {
    return this.usersService.getUserData(userId);
  }

  @Put('/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update base data of a user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponse, description: 'User updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  updateUserData(
    @GetUserAndAuthorize() user: UserDocument,
    @Param('userId') userId: string,
    @Body(ValidationPipe) userData: UpdateUserDataDto,
  ): Promise<UserResponse> {
    return this.usersService.updateUserData(userId, userData);
  }

  @Post('/token-refresh/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create a new access token for a user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokenResponse, description: 'Token refreshed' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  refreshToken(@GetUserAndAuthorize() user: UserDocument, @Param('userId') userId: string): Promise<TokenResponse> {
    return this.usersService.refreshToken(userId);
  }

  @Post('/change-password/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Change the password of a user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Password changed' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  changePassword(
    @GetUserAndAuthorize() user: UserDocument,
    @Param('userId') userId: string,
    @Body(ValidationPipe) data: ChangePasswordDto,
  ): Promise<void> {
    return this.usersService.changePassword(userId, data);
  }

  @Post('/password-reset-request')
  @HttpCode(200)
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiOkResponse({ description: 'Password reset email sent' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  @ApiServiceUnavailableResponse({ description: 'Unable to send email' })
  requestPasswordResetEmail(@Body(ValidationPipe) data: PasswordResetRequestDto): Promise<void> {
    return this.usersService.sendPasswordResetEmail(data);
  }

  @Post('/reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reset the password of a user using a resetToken' })
  @ApiOkResponse({ description: 'Password changed' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Reset token is invalid or expired' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  resetPassword(@Body(ValidationPipe) data: PasswordResetDto): Promise<void> {
    return this.usersService.resetPassword(data);
  }

  @Delete('/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete a user account' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Account deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  deleteAccount(@GetUserAndAuthorize() user: UserDocument, @Param('userId') userId: string): Promise<void> {
    return this.usersService.deleteUser(userId);
  }
}
