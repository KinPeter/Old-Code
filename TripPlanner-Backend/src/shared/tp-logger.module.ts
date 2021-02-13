import { Module } from '@nestjs/common';
import { TpLogger } from './tp-logger.service';

@Module({
  providers: [TpLogger],
  exports: [TpLogger],
})
export class TpLoggerModule {}
