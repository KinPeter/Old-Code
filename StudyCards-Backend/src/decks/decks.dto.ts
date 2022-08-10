import { IsJSON, IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeckDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  name: string;

  @IsString()
  @IsUrl()
  @ApiProperty()
  link: string;

  @IsString()
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  progress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
