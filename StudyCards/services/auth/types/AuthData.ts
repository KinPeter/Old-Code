import { Role } from '~/services/auth/types/Role'

export interface AuthData {
  id: string
  exp: number
  role: Role
}
