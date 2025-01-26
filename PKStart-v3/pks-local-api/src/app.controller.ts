import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { apiDocs } from './shared/api-docs'

@ApiTags('Default')
@Controller()
export class AppController {
  @Get()
  @ApiOperation(apiDocs.default.operation)
  @ApiOkResponse(apiDocs.default.ok)
  public async getHello(): Promise<{ result: string }> {
    return { result: 'The local API is up and running!' }
  }
}
