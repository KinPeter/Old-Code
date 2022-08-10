import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { MyLoggerModule } from 'src/shared/my-logger.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DecksModule } from '../decks/decks.module';

@Module({
  controllers: [UserController],
  imports: [forwardRef(() => AuthModule), forwardRef(() => DecksModule), MyLoggerModule],
  exports: [UserService, UserRepository],
  providers: [UserService, UserRepository],
})
export class UserModule {}
