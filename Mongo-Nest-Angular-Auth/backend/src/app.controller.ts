import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Test the connection to the API' })
  @ApiOkResponse({ type: String })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
