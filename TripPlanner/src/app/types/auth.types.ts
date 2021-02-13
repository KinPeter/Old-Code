export interface SignupRequest {
  email: string
  password: string
  displayName: string
}

export interface SignupResponse {
  id: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface TokenResponse {
  token: string
  expiresAt: number
}
