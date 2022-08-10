/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { DecksService } from './decks.service';
import { DeckResource } from './decks.types';
import { UserDocument } from 'src/auth/user.model';
import { GetUserAndAuthorize } from 'src/shared/get-user-and-authorize.decorator';
import { AuthGuard } from '@nestjs/passport';
import { DeckDto } from './decks.dto';

@ApiTags('Decks')
@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get('/:userId/:deckId')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get a deck by ID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeckResource, description: 'A deck' })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  getDeck(
    @GetUserAndAuthorize() user: UserDocument,
    @Param('userId') userId: string,
    @Param('deckId') deckId: string,
  ): Promise<DeckResource> {
    return this.decksService.getById(deckId);
  }

  @Get('/:userId')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get all decks for a user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeckResource, description: 'Array of Decks' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  getDecksForUser(
    @GetUserAndAuthorize() user: UserDocument,
    @Param('userId') userId: string,
  ): Promise<DeckResource[]> {
    return this.decksService.getAllForUser(userId);
  }

  @Post('/:userId')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create a deck' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DeckResource, description: 'The newly created deck' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  createDeck(
    @GetUserAndAuthorize() user: UserDocument,
    @Body(ValidationPipe) deckDto: DeckDto,
    @Param('userId') userId: string,
  ): Promise<DeckResource> {
    return this.decksService.createDeck(deckDto);
  }

  @Put('/:userId/:deckId')
  @HttpCode(202)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update a deck' })
  @ApiBearerAuth()
  @ApiAcceptedResponse({ description: 'Deck updated' })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  updateDeck(
    @GetUserAndAuthorize() user: UserDocument,
    @Body(ValidationPipe) deckDto: DeckDto,
    @Param('userId') userId: string,
    @Param('deckId') deckId: string,
  ): Promise<void> {
    return this.decksService.updateDeck(deckId, deckDto);
  }

  @Delete('/:userId/:deckId')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete a deck by ID' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Deck deleted' })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  deleteAccount(
    @GetUserAndAuthorize() user: UserDocument,
    @Param('userId') userId: string,
    @Param('deckId') deckId: string,
  ): Promise<void> {
    return this.decksService.deleteDeck(deckId);
  }
}
