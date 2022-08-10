import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DecksController } from './decks.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DeckSchema } from './deck.model';
import { MyLoggerModule } from 'src/shared/my-logger.module';
import { DecksService } from './decks.service';
import { DecksRepository } from './decks.repository';

@Module({
  controllers: [DecksController],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
    MyLoggerModule,
  ],
  exports: [DecksService, DecksRepository],
  providers: [DecksService, DecksRepository],
})
export class DecksModule {}
