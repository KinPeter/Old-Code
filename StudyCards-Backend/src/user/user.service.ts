import { Injectable } from '@nestjs/common';

import { MyLogger } from '../shared/my-logger.service';
import { DecksRepository } from '../decks/decks.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly decksRepository: DecksRepository,
    private readonly logger: MyLogger,
  ) {
    this.logger.setContext('UserService');
  }

  async deleteUser(userId: string): Promise<void> {
    await Promise.all([
      this.userRepository.deleteUser(userId),
      this.decksRepository.deleteAllForUser(userId),
    ]);
    this.logger.log(`User account deleted (id: ${userId})`);
  }
}
