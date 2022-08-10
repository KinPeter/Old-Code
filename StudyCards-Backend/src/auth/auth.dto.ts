import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;
}
