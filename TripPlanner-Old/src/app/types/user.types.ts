import { DateFormat } from '~/app/shared/date-format';

export class User {
  constructor(
    public id: string,
    public displayName: string,
    public photoUrl: string | null,
    public token: string,
    public expiresAt: number,
    public memberSince: Date,
    public preferredDateFormat: DateFormat,
    public numberOfTrips: number,
  ) {}
}

export interface UserProfileData {
  displayName: string;
  photoUrl: string;
  preferredDateFormat: DateFormat;
}

export interface PasswordResetRequest {
  email: string;
  resetToken: string;
  newPassword: string;
}
