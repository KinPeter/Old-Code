import { DateFormat } from '~/app/types/date-format'

export interface UserProfileData {
  displayName: string
  photoUrl: string | null
  preferredDateFormat: DateFormat
}

export interface UserInfo extends UserProfileData {
  id: string
  memberSince: Date
  numberOfTrips: number
}

export interface User extends UserInfo {
  token: string
  expiresAt: number
}

export interface PasswordResetRequest {
  email: string
  resetToken: string
  newPassword: string
}
