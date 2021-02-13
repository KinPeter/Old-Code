import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TripsRepository } from './trips.repository';
import { TripSchema } from './trips.model';
import { UsersModule } from 'src/users/users.module';
import { TpLoggerModule } from 'src/shared/tp-logger.module';

@Module({
  controllers: [TripsController],
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'Trip', schema: TripSchema }]),
    TpLoggerModule,
  ],
  exports: [TripsService, TripsRepository],
  providers: [TripsService, TripsRepository],
})
export class TripsModule {}
