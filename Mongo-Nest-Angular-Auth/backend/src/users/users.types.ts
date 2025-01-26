import { ApiProperty } from '@nestjs/swagger';

import { DateFormat } from 'src/shared/date-formats';

export class SignupResponse {
  @ApiProperty()
  id: string;
}

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  photoUrl: string | null;

  @ApiProperty({ enum: Object.values(DateFormat) })
  preferredDateFormat: DateFormat;

  @ApiProperty()
  memberSince: Date;

  @ApiProperty()
  numberOfTrips: number;
}

export class LoginResponse extends UserResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresAt: number;
}

export class TokenResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresAt: number;
}

export interface JwtPayload {
  email: string;
}

export interface JwtDecodedToken {
  email: string;
  iat: number;
  exp: number;
}
