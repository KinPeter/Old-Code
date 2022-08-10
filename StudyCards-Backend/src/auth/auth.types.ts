import { ApiProperty } from '@nestjs/swagger';

export class SignupResponse {
  @ApiProperty()
  id: string;
}

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}

export class LoginResponse extends UserResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresAt: number;
}

export interface JwtPayload {
  username: string;
}

export interface JwtDecodedToken {
  username: string;
  iat: number;
  exp: number;
}
