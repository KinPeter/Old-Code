import { ChangeProfileRequest, GameProfile, KeyBindings, MprData } from 'pks-common'
import { ApiProperty } from '@nestjs/swagger'

export class KeyBindingsDto implements KeyBindings {
  @ApiProperty()
  left: string

  @ApiProperty()
  leftSideFarDown: string

  @ApiProperty()
  leftSideFirst: string

  @ApiProperty()
  leftSideSecond: string

  @ApiProperty()
  middle: string

  @ApiProperty()
  right: string

  @ApiProperty()
  topLeftFirst: string

  @ApiProperty()
  topLeftSecond: string

  @ApiProperty()
  topMiddleSmall: string

  @ApiProperty()
  wheelLeft: string

  @ApiProperty()
  wheelRight: string
}

export class GameProfileDto implements GameProfile {
  @ApiProperty()
  abbreviation: string

  @ApiProperty({ type: KeyBindingsDto })
  bindings: KeyBindingsDto

  @ApiProperty()
  isDefault: boolean

  @ApiProperty()
  keywords: string[]

  @ApiProperty()
  name: string

  @ApiProperty()
  shortName: string
}

export class MprDataDto implements MprData {
  @ApiProperty()
  activeProfile: number

  @ApiProperty({ type: GameProfileDto })
  configuredGame: GameProfileDto

  @ApiProperty({ type: [GameProfileDto] })
  profiles: GameProfileDto[]
}

export class ChangeProfileRequestDto implements ChangeProfileRequest {
  @ApiProperty({ nullable: true })
  abbreviation: string | null

  @ApiProperty({ nullable: true })
  profileNumber: number | null
}
