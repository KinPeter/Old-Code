import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsJSON,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
  IsUrl,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class TripDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startingDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  endingDate: Date;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  coverImageUrl: string;

  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  @ArrayMinSize(1)
  countries: string[];

  @IsString()
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  days: string;
}
