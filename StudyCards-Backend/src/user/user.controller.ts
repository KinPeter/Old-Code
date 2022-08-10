import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserDocument } from '../auth/user.model';
import { GetUserAndAuthorize } from '../shared/get-user-and-authorize.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('/:userId')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete a user account' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Account deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  deleteAccount(@GetUserAndAuthorize() user: UserDocument, @Param('userId') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
