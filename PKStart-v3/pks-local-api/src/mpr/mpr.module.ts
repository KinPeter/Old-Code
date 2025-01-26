import { Module } from '@nestjs/common'
import { MprController } from './mpr.controller'
import { MprService } from './mpr.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MprController],
  providers: [MprService],
})
export class MprModule {}
