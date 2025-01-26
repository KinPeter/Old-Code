import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { homedir } from 'os'
import { resolve } from 'path'
import { LocalApiError, MprConfig } from 'pks-common'
import { ChangeProfileRequestDto, GameProfileDto, MprDataDto } from './mpr.dto'
import {
  PK_MPR_CONFIG_FILE,
  PK_MPR_FOLDER,
  PK_MPR_G502_ACTIVE_PROFILE_FILE,
  PK_MPR_G502_GAME_PROFILE_FILE,
} from './mpr.constants'

@Injectable()
export class MprService {
  private readonly logger = new Logger(MprService.name)

  public async getCurrentState(): Promise<MprDataDto> {
    const profiles = this.readMprConfig()
    const activeProfile = this.readActiveProfile()
    const configuredGame = this.readSavedGameProfile(profiles)

    return {
      profiles,
      activeProfile,
      configuredGame,
    }
  }

  public async changeProfile(request: ChangeProfileRequestDto): Promise<MprDataDto> {
    if (
      !('abbreviation' in request) ||
      !('profileNumber' in request) ||
      (request.abbreviation === null && request.profileNumber === null) ||
      (request.abbreviation !== null && request.profileNumber !== null)
    ) {
      throw new BadRequestException(LocalApiError.MISSING_REQUEST_PARAMETERS)
    }
    this.runMprScript(`mpr-${request.abbreviation ?? request.profileNumber}.sh`)
    return await this.getCurrentState()
  }

  private readMprConfig(): GameProfileDto[] {
    try {
      return (
        JSON.parse(readFileSync(resolve(homedir(), PK_MPR_CONFIG_FILE)).toString()) as MprConfig
      ).profiles as GameProfileDto[]
    } catch (e) {
      this.logger.error('Error reading MprConfig')
      this.logger.error(e)
      throw new InternalServerErrorException(LocalApiError.MISSING_OR_INVALID_MPR_CONFIG)
    }
  }

  private readActiveProfile(): number {
    try {
      return Number(
        readFileSync(resolve(homedir(), PK_MPR_G502_ACTIVE_PROFILE_FILE)).toString().trim()
      )
    } catch (e) {
      this.logger.error('Error reading active mouse profile')
      this.logger.error(e)
      throw new InternalServerErrorException(LocalApiError.MISSING_OR_INVALID_MPR_DATA)
    }
  }

  private readSavedGameProfile(profiles: GameProfileDto[]): GameProfileDto {
    try {
      const gameName = readFileSync(resolve(homedir(), PK_MPR_G502_GAME_PROFILE_FILE))
        .toString()
        .trim()
      return profiles.find(({ name }) => name === gameName)
    } catch (e) {
      this.logger.error('Error reading saved game profile')
      this.logger.error(e)
      throw new InternalServerErrorException(LocalApiError.MISSING_OR_INVALID_MPR_DATA)
    }
  }

  private runMprScript(filename: string): void {
    try {
      this.logger.log('Running script: ' + filename)
      const output = execSync(`/bin/bash ${resolve(homedir(), PK_MPR_FOLDER, filename)}`)
      this.logger.log(output.toString().trim() || 'No output for script ' + filename)
    } catch (e) {
      this.logger.error('Error running MPR script: ' + filename)
      this.logger.error(e)
      throw new InternalServerErrorException(LocalApiError.MPR_SCRIPT_FAILED)
    }
  }
}
