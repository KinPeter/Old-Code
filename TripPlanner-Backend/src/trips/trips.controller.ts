import { Controller, Get, UseGuards, Param, Post, Body, ValidationPipe, HttpCode, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { TripsService } from './trips.service';
import { Trip } from './trips.types';
import { TripDto } from './trips.dto';
import { UserDocument } from 'src/users/users.model';
import { GetUser } from 'src/shared/get-user.decorator';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get('/:tripId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get a trip by ID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Trip, description: 'A trip' })
  @ApiNotFoundResponse({ description: 'Trip not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  getTrip(@GetUser() user: UserDocument, @Param('tripId') tripId: string): Promise<Trip> {
    return this.tripsService.getTrip(user, tripId);
  }

  @Get('/all/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get all trips of a user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Trip, description: 'An array of trips' })
  @ApiNotFoundResponse({ description: 'Trips not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  getTripsOfUser(@GetUser() user: UserDocument, @Param('userId') userId: string): Promise<Trip[]> {
    return this.tripsService.getTripsOfUser(user, userId);
  }

  @Post('')
  @HttpCode(201)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create a trip' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Trip, description: 'The newly created trip' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  createTrip(@GetUser() user: UserDocument, @Body(ValidationPipe) tripDto: TripDto): Promise<Trip> {
    return this.tripsService.createTrip(user, tripDto);
  }

  @Put('/:tripId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update a trip' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Trip, description: 'Trip updated' })
  @ApiNotFoundResponse({ description: 'Trip not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  updateTrip(
    @GetUser() user: UserDocument,
    @Body(ValidationPipe) tripDto: TripDto,
    @Param('tripId') tripId: string,
  ): Promise<Trip> {
    return this.tripsService.updateTrip(user, tripId, tripDto);
  }

  @Delete('/:tripId')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete a trip by ID' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Trip deleted' })
  @ApiNotFoundResponse({ description: 'Trip not found' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User has no access rights to the requested content' })
  @ApiBadRequestResponse({ description: 'Validation error: request data is invalid' })
  deleteAccount(@GetUser() user: UserDocument, @Param('tripId') tripId: string): Promise<void> {
    return this.tripsService.deleteTrip(user, tripId);
  }
}
