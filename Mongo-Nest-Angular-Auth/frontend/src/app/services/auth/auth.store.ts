import { Injectable } from '@angular/core'
import { Store } from '~/app/services/core/store'
import { Observable } from 'rxjs'

interface AuthState {
  token: string
  isAuth: boolean
}

const initialState: AuthState = {
  token: null,
  isAuth: false
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends Store<AuthState> {
  public isAuth$: Observable<boolean> = this.select(state => state.isAuth)

  constructor() {
    super(initialState)
  }

  public get isAuth(): boolean {
    return this.state.isAuth
  }

  public get token(): string {
    return this.state.token
  }

  public setLogin(token: string): void {
    this.setState({
      token: token,
      isAuth: true
    })
  }

  public setLogout(): void {
    this.setState({
      token: null,
      isAuth: false
    })
  }
}
