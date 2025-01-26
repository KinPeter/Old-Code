import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { MprService } from './mpr.service'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ChangeProfileRequestDto, MprDataDto } from './mpr.dto'
import { apiDocs } from '../shared/api-docs'

@ApiTags('Linux / MPR')
@Controller('linux/mpr')
export class MprController {
  constructor(private readonly mprService: MprService) {}

  @Get('/current-state')
  @ApiOperation(apiDocs.mpr.currentState.operation)
  @ApiOkResponse(apiDocs.mpr.currentState.ok)
  @ApiInternalServerErrorResponse(apiDocs.mpr.currentState.error.internalServerError)
  async getCurrentState(): Promise<MprDataDto> {
    return this.mprService.getCurrentState()
  }

  @Post('/change-profile')
  @HttpCode(200)
  @ApiOperation(apiDocs.mpr.changeProfile.operation)
  @ApiOkResponse(apiDocs.mpr.changeProfile.ok)
  @ApiBadRequestResponse(apiDocs.mpr.changeProfile.error.badRequest)
  @ApiInternalServerErrorResponse(apiDocs.mpr.changeProfile.error.internalServerError)
  async changeProfile(@Body() request: ChangeProfileRequestDto): Promise<MprDataDto> {
    return this.mprService.changeProfile(request)
  }
}
