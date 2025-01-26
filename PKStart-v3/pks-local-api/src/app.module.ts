import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { MprModule } from './mpr/mpr.module'

@Module({
  imports: [ConfigModule.forRoot(), MprModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
