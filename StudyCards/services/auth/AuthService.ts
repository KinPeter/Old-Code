import ApiService from '~/services/api/ApiService'
import { AuthCredentials } from '~/services/auth/types/AuthCredentials'
import { LoginResponse } from '~/services/auth/types/LoginResponse'
import { SignUpResponse } from '~/services/auth/types/SignUpResponse'

export class AuthService {
  constructor(private api: ApiService) {}

  login(username: string, password: string): Promise<LoginResponse> {
    return this.api.post<AuthCredentials, LoginResponse>('/auth/login', {
      username,
      password,
    })
  }

  register(username: string, password: string): Promise<SignUpResponse> {
    return this.api.post<AuthCredentials, SignUpResponse>('/auth/register', {
      username,
      password,
    })
  }
}
