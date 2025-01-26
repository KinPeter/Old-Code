import { IsString, MinLength, MaxLength, IsNotEmpty, IsIn, IsUrl, IsOptional, IsJWT, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { DateFormat } from 'src/shared/date-formats';
import { CustomValidationError } from 'src/shared/custom-errors';

export class AuthCredentialsDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: CustomValidationError.WEAK_PASSWORD })
  @ApiProperty()
  password: string;
}

export class UserSignupDto extends AuthCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  displayName: string;
}

export class UpdateUserDataDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  displayName: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(DateFormat), { message: CustomValidationError.INVALID_DATE_FORMAT })
  @ApiProperty({ enum: Object.values(DateFormat) })
  preferredDateFormat: DateFormat;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(4)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: CustomValidationError.WEAK_PASSWORD })
  @ApiProperty()
  newPassword: string;
}

export class PasswordResetRequestDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class PasswordResetDto extends ChangePasswordDto {
  @IsJWT()
  @ApiProperty()
  resetToken: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
